import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6efe7] flex items-center justify-center px-6 mt-20 pb-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-[#c58a46] mb-6 hover:underline"
        >
          ← Retour
        </button>

        <p className="text-[#c58a46] uppercase tracking-[0.25em] text-xs font-semibold mb-2">
          Nouveau compte
        </p>

        <h2 className="text-3xl font-bold text-[#1A0F0A] mb-6">
          Inscription
        </h2>

        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;