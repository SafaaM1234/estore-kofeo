import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCartByUser, createCart, addItem } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartId, setCartId] = useState(null);

  const { user } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    setCartItems([]);
    setCartId(null);
  }, [userId]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => setCheckoutOpen(false);

  const openCartWithItem = useCallback(() => setIsCartOpen(true), []);

  const addToCart = async (product) => {
    const upsertLocal = (deltaQty) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + deltaQty }
              : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            unitPrice: product.price,
            imageUrl: product.imageUrl,
            quantity: deltaQty,
          },
        ];
      });
      openCartWithItem();
    };

    if (!userId) {
      upsertLocal(1);
      return;
    }

    try {
      let cid = cartId;
      if (!cid) {
        try {
          const existing = await getCartByUser(userId);
          cid = existing?.id ?? null;
        } catch {
          cid = null;
        }
        if (!cid) {
          const created = await createCart(userId);
          cid = created?.id ?? null;
        }
        if (cid) setCartId(cid);
      }

      if (cid) {
        const itemDto = {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.price,
        };
        await addItem(cid, itemDto);
      }
      upsertLocal(1);
    } catch (err) {
      console.error("Erreur ajout panier :", err);
      upsertLocal(1);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        isCartOpen,
        checkoutOpen,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
