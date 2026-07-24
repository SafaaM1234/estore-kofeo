import React from "react";
import { useNavigate } from "react-router-dom";
import { TbCoffee } from "react-icons/tb";
const AuthChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6efe7] to-[#e8d7c6] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center">

        <p className="text-[#c58a46] uppercase tracking-[0.25em] text-xs font-semibold mb-3">
          Bienvenue
        </p>

        <h1 className="text-4xl font-bold text-[#1A0F0A] mb-3">
          Kofeo 
          <TbCoffee className="inline-block ml-2 text-4xl"  />
        </h1>

        <p className="text-gray-600 mb-8 leading-7">
          Connectez-vous ou créez un compte pour accéder à votre boutique café.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#1A0F0A] text-white py-3 rounded-xl hover:scale-[1.02] transition"
          >
            Se connecter
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full border border-[#1A0F0A] text-[#1A0F0A] py-3 rounded-xl hover:bg-[#f3ebe3] transition"
          >
            S’inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthChoice;