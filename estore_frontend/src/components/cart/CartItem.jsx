import React from "react";
import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex gap-3 py-4 border-b border-[#E0D6C8] last:border-0">
      <img
        src={item.imageUrl || "/assets/images/default.jpg"}
        alt=""
        className="w-[72px] h-[72px] rounded-lg object-cover shrink-0 bg-[#EDE3D6]"
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between gap-2 items-start">
          <p className="text-[#1A0F0A] font-semibold text-sm leading-snug line-clamp-2">
            {item.name}
          </p>
          <p className="text-[#1A0F0A] font-bold text-sm whitespace-nowrap shrink-0">
            {lineTotal.toFixed(2)} MAD
          </p>
        </div>
        <p className="text-[#9A8B7E] text-xs mt-0.5">
          {Number(item.unitPrice).toFixed(2)} MAD / unité
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-[#E0D6C8] bg-white p-0.5">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-md text-[#1A0F0A] hover:bg-[#F5F1EE] font-semibold"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-md text-[#1A0F0A] hover:bg-[#F5F1EE] font-semibold"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-[#9A8B7E] hover:text-red-600 transition"
            aria-label="Retirer du panier"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
