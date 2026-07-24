import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // Sécurité : si products n'est pas un tableau, on force un tableau vide
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {safeProducts.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        safeProducts.map((p) => (
          <ProductCard key={p.id} product={p} className="h-[300px]" />
        ))
      )}
    </div>
  );
};

export default ProductGrid;
