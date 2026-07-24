import React from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const navigate = useNavigate();
  const { cartItems, isCartOpen, closeCart } = useCart();
  const lineCount = cartItems.length;
  const qtyCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fermer le panier"
        className="flex-1 bg-black/40 backdrop-blur-sm cursor-default"
        onClick={closeCart}
      />
      <aside
        className="w-full max-w-[400px] h-full bg-[#F9F5F0] shadow-2xl flex flex-col"
        style={{
          animation: "cartDrawerIn 0.28s ease-out forwards",
        }}
      >
        <style>{`
          @keyframes cartDrawerIn {
            from { transform: translateX(100%); opacity: 0.9; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E0D6C8] shrink-0">
          <div className="flex items-center gap-2 text-[#1A0F0A] font-semibold text-lg">
            Mon Panier
            {lineCount > 0 && (
              <span className="min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#E07B39] text-white text-xs font-bold flex items-center justify-center">
                {qtyCount > 99 ? "99+" : qtyCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 rounded-lg text-[#1A0F0A]/70 hover:text-[#C68642] hover:bg-[#EDE3D6] transition"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#EDE3D6] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={34} className="text-[#C68642]" />
              </div>
              <h3 className="text-[#1A0F0A] font-semibold text-lg">
                Votre panier est vide
              </h3>
              <p className="text-[#6B5B4A] text-sm mt-2 max-w-[240px]">
                Explorez notre magasin et ajoutez des produits
              </p>
              <button
  onClick={() => navigate("/shop")}
  className="mt-4 px-5 py-2.5 bg-[#C68642] text-white text-sm font-medium rounded-lg hover:bg-[#b87635] transition"
>
  Voir le magasin
</button>
            </div>
          ) : (
            <div className="space-y-1">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && <CartSummary />}
      </aside>
    </div>
  );
};

export default CartDrawer;
