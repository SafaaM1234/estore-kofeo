import React from "react";
import PageHeader from "../components/common/PageHeader";
import { FaShoppingCart, FaCreditCard, FaTruck, FaShieldAlt, FaUserShield, FaEnvelope } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="bg-[#f6efe7] min-h-screen flex flex-col">


      {/* En-tête */}
      <PageHeader
        title="Conditions d’utilisation"
        subtitle="Règles simples pour une expérience café premium."
      />

      {/* Contenu principal */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-md space-y-8">
          
          {/* 1. Utilisation du site */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0"> 
              <FaShoppingCart className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Utilisation du site</h2>
              <p className="text-gray-700 leading-7">
                En accédant à notre site, vous acceptez d’utiliser nos services de manière responsable 
                et conforme aux lois marocaines. Toute tentative de fraude ou d’abus est strictement interdite.
              </p>
            </div>
          </div>

          <hr className="border-t-2 border-[#f3e3d1]" />

          {/* 2. Commandes et paiements */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0"> 
              <FaCreditCard className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Commandes et paiements</h2>
              <p className="text-gray-700 leading-7">
                Les commandes doivent être réglées via les moyens de paiement proposés sur notre site. 
                Nous nous réservons le droit d’annuler toute commande en cas de problème de paiement ou de suspicion de fraude.
              </p>
            </div>
          </div>

          <hr className="border-t-2 border-[#f3e3d1]" />

          {/* 3. Livraison */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">  
              <FaTruck className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Livraison</h2>
              <p className="text-gray-700 leading-7">
                Les délais de livraison sont indiqués lors de la commande. Nous faisons tout notre possible 
                pour respecter ces délais, mais des retards peuvent survenir indépendamment de notre volonté.
              </p>
            </div>
          </div>

          <hr className="border-t-2 border-[#f3e3d1]" />

          {/* 4. Responsabilité */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">  
              <FaShieldAlt className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Responsabilité</h2>
              <p className="text-gray-700 leading-7">
                Nous ne pouvons être tenus responsables des dommages indirects liés à l’utilisation de nos produits 
                ou à des retards de livraison. Nos obligations se limitent à la valeur de la commande concernée.
              </p>
            </div>
          </div>

          <hr className="border-t-2 border-[#f3e3d1]" />

          {/* 5. Protection des données */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">  
              <FaUserShield className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Protection des données</h2>
              <p className="text-gray-700 leading-7">
                Vos informations personnelles sont traitées conformément à notre Politique de confidentialité. 
                Elles ne sont utilisées que pour le traitement de vos commandes et la gestion de votre compte.
              </p>
            </div>
          </div>

          <hr className="border-t-2 border-[#f3e3d1]" />

          {/* 6. Contact */}
          <div className="flex gap-4">
            <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">  
              <FaEnvelope className="text-[#c58a46] text-xl" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Contact</h2>
              <p className="text-gray-700 leading-7">
                Pour toute question concernant ces conditions, vous pouvez nous écrire à 
                <strong> contact@kofeo.ma </strong> ou par téléphone au <strong>+212 6 12 34 56 78</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Terms;