import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // ✅ envoie toutes les valeurs au backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="firstName"
        value={form.firstName}
        placeholder="Prénom"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <input
        name="lastName"
        value={form.lastName}
        placeholder="Nom"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      {/* Mot de passe avec eye toggle */}
      <div className="relative">
        <input
          name="password"
          value={form.password}
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          onChange={handleChange}
          className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46] pr-10"
        />
      </div>

      {/* Champs profil */}
      <input
        name="phone"
        value={form.phone}
        placeholder="Téléphone"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <input
        name="address"
        value={form.address}
        placeholder="Adresse"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <input
        name="city"
        value={form.city}
        placeholder="Ville"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <input
        name="country"
        value={form.country}
        placeholder="Pays"
        onChange={handleChange}
        className="w-full p-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C58A46]"
      />

      <button
        type="submit"
        className="w-full bg-[#1A0F0A] text-white py-2.5 rounded-lg text-sm hover:bg-black transition"
      >
        Créer un compte
      </button>
    </form>
  );
};

export default RegisterForm;