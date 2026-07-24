import React from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/images/hero/hero2.jpeg"; // ton image café (2e image)
import "../../styles/globals.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopRedirect = () => { navigate("/shop"); };

  const handleScrollToCategories = () => {
    const categoriesSection = document.getElementById("categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 max-w-3xl px-6">
        {/* Petit titre doré */}
        <div className="flex items-center gap-3 mb-5 ml-12">
          <span className="w-10 h-[1px] bg-[#c68b3f]"></span>
          <p className="text-[12px] text-[#c68b3f] uppercase tracking-[0.25em] font-semibold">
            Premium Coffee Store
          </p>
        </div>
        <h1 className="text-6xl font-serif font-bold mb-4">
          L'excellence du café,{" "}
          <span className="text-[#c68b3f]">livrée chez vous.</span>
        </h1>
        <br/>
        <p className="text-lg mb-8 text-gray-400">
          Découvrez notre sélection premium de machines, grains et accessoires <br/>pour sublimer chaque tasse{/*Des grains d'exception aux machines professionnelles — découvrez notre
          sélection premium pour transformer votre rituel café.*/}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={handleShopRedirect}
            className="bg-[#c68b3f] hover:bg-[#9c6524] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Découvrir le magasin →
          </button>

          <button
            onClick={handleScrollToCategories}
            className="border border-white text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-white hover:text-[#1a1a1a]"          >
            Explorer les catégories
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
