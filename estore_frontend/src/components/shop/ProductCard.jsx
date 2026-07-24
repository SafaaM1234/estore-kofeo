import { Heart } from "react-feather";
import React,{ useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, onClick , onAddToCart }) => {
  const { addToCart } = useCart();
  const [favorite, setFavorite] = useState(false);

  return (
    <div
      className="h-[500px] flex flex-col justify-between bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer relative"
      onClick={onClick}
    >
      {/* Heart au-dessus de l'image */}
      <div className="flex justify-end mb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFavorite(!favorite);
          }}
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${
              favorite ? "text-red-500 fill-red-500" : "text-gray-400 fill-gray-400"
            }`}
          />
        </button>
      </div>
      <img
        src={product.imageUrl || "/assets/images/default.jpg"}
        alt={product.name}
        className="rounded-lg h-68 w-full object-cover"
      />
      <h3 className="mt-3 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
      <div className="flex items-center gap-2 mt-2">
        <p className="text-yellow-500">
          {"⭐".repeat(Math.round(product.averageRating || 0))}
        </p>
        <span className="text-gray-500 text-sm">
          ({product.reviewCount || 0})
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-brownie font-bold">{product.price} MAD</p>
        <button
  onClick={(e) => {
    e.stopPropagation(); // ✅ empêche l’ouverture du détail produit
    addToCart(product);
  }}
  className="bg-[#c68b3f] text-[white] px-5 py-2 rounded hover:bg-[#9c6524]"
>
  + Panier
</button>
      </div>
    </div>
  );
};

export default ProductCard;
