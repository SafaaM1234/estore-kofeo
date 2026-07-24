import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartItems, closeCart, openCheckout } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal;

  const handleContinueShopping = () => {
    closeCart();
    navigate("/shop");
  };

  return (
      <div className="p-5 border-t border-[#E0D6C8] bg-[#F9F5F0] shrink-0 space-y-3">
        <div className="flex justify-between text-sm text-[#4A3F36]">
          <span>Sous-total</span>
          <span className="font-medium">{subtotal.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between items-center text-[#1A0F0A] font-bold text-base">
          <span>Total</span>
          <span className="text-[#C68642] text-lg">{total.toFixed(2)} MAD</span>
        </div>

        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={() => openCheckout()}
          className="w-full rounded-xl bg-gradient-to-r from-[#A67449] to-[#63412B] py-3.5 text-white font-semibold text-sm hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          Passer à la caisse
        </button>
        <button
          type="button"
          onClick={handleContinueShopping}
          className="w-full rounded-xl border-2 border-[#D6C9B8] bg-white py-3.5 text-[#1A0F0A] font-semibold text-sm hover:bg-[#F5F1EE] transition"
        >
          Continuer mes achats
        </button>
      </div>
  );
};

export default CartSummary;
