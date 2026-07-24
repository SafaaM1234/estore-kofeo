import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  getAllCategories,
  searchProducts,
  getProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/shop/ProductCard";
import ProductModal from "../components/shop/ProductModal";
import SearchBar from "../components/shop/SearchBar";
import CategoryFilter from "../components/shop/CategoryFilter";
import { useLocation } from "react-router-dom";


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryIdParam = params.get("categoryId");

  useEffect(() => {
    const fetchData = async () => {
      const cat = await getAllCategories();
      setCategories(cat);

    let prod;
      if (categoryIdParam) {
        prod = await getProductsByCategory(categoryIdParam);
        setSelectedCategory(categoryIdParam);
      } else {
        prod = await getAllProducts();
      }
      setProducts(prod);
    };
    fetchData();
  }, [categoryIdParam]);

  const handleSearch = async (keyword) => {
    setSearchTerm(keyword);
    if (keyword.trim() === "") {
      const prod = await getAllProducts();
      setProducts(prod);
    } else {
      const res = await searchProducts(keyword);
      setProducts(res);
    }
  };

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      const prod = await getAllProducts();
      setProducts(prod);
    } else {
      const res = await getProductsByCategory(categoryId);
      setProducts(res);
    }
  };

  return (
    <div className="bg-cream min-h-screen pt-21">
      {/* Header */}
      <div className="bg-[#1A0F0A] text-white py-12 px-16">
        <p className="text-[10px] text-[#C68642] uppercase tracking-[0.2em] font-semibold mb-2">
          Notre Boutique
        </p>
        <h1 className="text-4xl font-bold font-serif">Le Magasin kofeo</h1>
        <p className="mt-3 text-sm text-gray-300 max-w-xl text-left leading-relaxed">
          Explorez notre gamme complète de produits café, sélectionnés avec passion
          <br/>pour les amateurs exigeants.
        </p>
        
      </div>

      {/* Search + Categories */}
      <div className="container mx-auto px-6 py-8">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;
