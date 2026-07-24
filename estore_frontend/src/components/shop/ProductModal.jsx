/*import { X } from "react-feather";
import Reviews from "./Reviews";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] md:w-[700px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.imageUrl || "/assets/images/default.jpg"}
            alt={product.name}
            className="rounded-lg w-full md:w-1/2 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500 mt-2">{product.description}</p>
            <p className="text-3xl font-semibold text-brownie mt-4">
              {product.price} MAD
            </p>

            <div className="flex items-center mt-4 gap-3">
              <button className="bg-brownie text-white px-4 py-2 rounded hover:bg-coffee">
                Acheter maintenant
              </button>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* Avis Clients */
        /*<div className="mt-6 border-t pt-4">
          <Reviews productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;*/

/*import { useEffect, useState } from "react";
import { getReviewsByProduct, getRatingByProduct } from "../../services/reviewService";

const ProductModal = ({ product, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ averageRating: 0, count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await getReviewsByProduct(product.id);
      const ratingData = await getRatingByProduct(product.id);
      setReviews(reviewsData);
      setRating(ratingData);
    };
    fetchData();
  }, [product.id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{product.name}</h2>

      {/* Rating */
      /*<div className="flex items-center gap-2 mt-2">
        <p className="text-yellow-500">
          {"⭐".repeat(Math.round(rating.averageRating))}
        </p>
        <span className="text-gray-500 text-sm">({rating.count})</span>
      </div>

      {/* Description complète */
      /*<p className="mt-4 text-gray-700 whitespace-pre-line">
        {product.description}
      </p>

      {/* Liste des reviews */
      /*<h3 className="mt-6 font-semibold">Avis des clients</h3>
      <ul className="mt-2 space-y-2">
        {reviews.map((r) => (
          <li key={r.id} className="border-b pb-2">
            <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
            <p className="text-gray-800">{r.comment}</p>
            <p className="text-sm text-gray-500">
              {r.verifiedPurchase ? "✅ Achat vérifié" : "❌ Non vérifié"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductModal;*/

import { X } from "react-feather";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import { getRatingByProduct } from "../../services/reviewService";
import { useCart } from "../../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const [rating, setRating] = useState({ averageRating: 0, count: 0 });
  const { addToCart } = useCart();
  const { cartItems, closeCart, openCheckout } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const ratingData = await getRatingByProduct(product.id);
      setRating(ratingData);
    };
    fetchData();
  }, [product.id]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[70] p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 w-full max-w-[750px] relative my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>

        {/* Layout horizontal */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image produit */}
          <img
            src={product.imageUrl || "/assets/images/default.jpg"}
            alt={product.name}
            className="rounded-lg w-full md:w-1/3 object-contain"
          />

          {/* Détails produit */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500 mt-2 whitespace-pre-line">{product.description}</p>
            <p className="text-3xl font-semibold text-brownie mt-4">
              {product.price} MAD
            </p>

            {/* Boutons d’action */}
            <div className="flex items-center mt-4 gap-3">
              <button onClick={() => openCheckout()} className="bg-[#C68642] text-white px-4 py-2 rounded  hover:bg-[#A56E35] transition">
                Acheter maintenant
              </button>
              <button 
                onClick={() => addToCart(product)} 
                className="bg-[#1A0F0A] text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                 Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        {/* Avis Clients */}
        <div className="mt-6 border-t pt-4">
          <Reviews productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;