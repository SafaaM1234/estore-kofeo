import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1A0F0A] text-white px-8 py-10 pt-16">
      
      {/* Bouton retour vers Home */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#c58a46] hover:text-white transition mb-6"
      >
        <FaArrowLeft />
        Retour à l'accueil
      </button>

      {/* Titre */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Sous-titre */}
      {subtitle && (
        <p className="text-[#c58a46] mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;