import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // état toggle

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6efe7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[400px]"
      >
        {/* Bouton retour */}
        <Link
          to="/"
          className="text-sm text-[#c58a46] mb-4 inline-block hover:underline"
        >
          ← Retour
        </Link>

        {/*Titre principal */}
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A0F0A]">
          Connexion
        </h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        {/* Champ mot de passe avec eye toggle */}
        <div className="relative mb-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-[#C58A46] focus:outline-none"
          >
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1A0F0A] text-white py-3 rounded-lg"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;