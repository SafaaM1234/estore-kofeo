import React from "react";

const CheckoutButton = ({ total }) => {
  const handleCheckout = () => {
    alert(`Paiement de ${total} MAD en cours...`);
    // 👉 Ici tu pourras connecter ton backend de paiement ou rediriger vers une page Checkout
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full bg-[#C68642] text-white py-3 rounded-full font-medium hover:bg-[#A56E35] transition"
    >
      Passer à la caisse
    </button>
  );
};

export default CheckoutButton;
