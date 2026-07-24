import React, { useEffect, useState } from "react";
import { getAllProducts , getBestSellers } from "../../services/productService";
import ProductCard from "../shop/ProductCard";
import ProductModal from "../shop/ProductModal";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cartCount } = useCart(); // récupère le panier et le compteur
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const products = await getBestSellers();
      setBestSellers(products);
    } catch (error) {
      console.error("Erreur chargement best-sellers:", error);
    }
  };
  fetchBestSellers();
}, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} ajouté au panier`);
    setTimeout(() => setNotification(""), 2000); // notification disparaît après 2s
  };

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#f9f5f0]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-[12px] text-[#c68b3f] uppercase tracking-[0.25em] font-semibold">
              Top ventes
            </p>
            <h2 className="text-4xl font-playfair font-bold text-[#1a0f0a]">
              Meilleures ventes
            </h2>
            <p className="text-gray-600">
              Les favoris de nos clients cette saison
            </p>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-[#c68b3f] hover:underline flex items-center gap-1"
          >
            Voir tout →
          </button>
        </div>
        {/* Grille produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {/* Notification ajout panier */}
        {notification && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1a0f0a] text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {notification}
          </div>
        )}

        {/* Modal produit */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
              <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
