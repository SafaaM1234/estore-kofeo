import React from "react";
import PageHeader from "../components/common/PageHeader";
import { FaTruck, FaBoxOpen, FaEnvelope, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
const DeliveryInfo = () => {
  return (
    <div className="bg-[#f6efe7] min-h-screen flex flex-col">
      

      {/* En-tête de page */}
      <PageHeader
        title="Informations de livraison"
        subtitle="Livraison rapide et fiable pour tous vos produits café."
      />

      {/* Contenu principal */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-[#1A0F0A] flex items-center gap-3">
            
              <FaTruckFast className="text-[#c58a46] text-3xl" />
            
            Livraison au Maroc
          </h2>

          <p className="text-gray-700 leading-8">
            Nous assurons la livraison sur l’ensemble du territoire marocain.
            Les commandes confirmées avant 14h sont généralement expédiées le jour même.
          </p>

          <div className="mt-6 text-gray-700 leading-8 space-y-3">
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaTruck className="text-[#c58a46]" />
              </span>
              Livraison standard : 48h – 72h selon la ville
            </p>
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaBoxOpen className="text-[#c58a46]" />
              </span>
              Livraison gratuite pour toute commande supérieure à 500 DH
            </p>
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaEnvelope className="text-[#c58a46]" />
              </span>
              Suivi de commande envoyé par email dès l’expédition
            </p>
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaShieldAlt className="text-[#c58a46]" />
              </span>
              Emballage sécurisé pour garantir la qualité de vos produits café
            </p>
          </div>
        

          {/* Zones de couverture encadrées */}
          <div className="mt-10 bg-[#f8f0e5] rounded-2xl p-8 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#1A0F0A] flex items-center gap-3">
            <span className="w-12 h-12 rounded-full bg-[#c58a46] flex items-center justify-center">
              <FaMapMarkerAlt className="text-[#f8f0e5] text-xl" />
            </span>
            Zones de couverture
            </h3>
            <p className="text-gray-700 leading-8">
              Nous livrons dans toutes les grandes villes du Maroc (Casablanca, Rabat,
              Marrakech, Fès, Tanger, Agadir, etc.) ainsi que dans les zones rurales
              accessibles par nos partenaires logistiques.
            </p>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default DeliveryInfo;