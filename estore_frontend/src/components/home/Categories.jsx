import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/productService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur chargement catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?categoryId=${categoryId}`);
  };

  return (
    <section id="categories" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[12px] text-[#c68b3f] uppercase tracking-[0.25em] font-semibold">
          Notre offre
        </p>
        <h2 className="text-4xl font-playfair font-bold text-[#1a0f0a] mb-3">
          Explorez nos catégories
        </h2>
        <p className="text-gray-600 mb-12">
          Tout ce dont vous avez besoin pour un café parfait, réuni en un seul endroit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img
                src={cat.image || cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="absolute bottom-6 left-6 text-left">
                <h3 className="text-white text-xl font-semibold">{cat.name}</h3>
                <p className="text-gray-300 text-sm">{cat.description}</p>
              </div>

              {/*<div className="absolute bottom-6 right-6 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>*/}
              <div className="absolute bottom-6 right-6 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300
                      border border-[#c68b3f] rounded-full px-2 py-1" >
                    →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
