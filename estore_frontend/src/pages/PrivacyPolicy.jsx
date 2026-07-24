import React from "react";
import PageHeader from "../components/common/PageHeader";

import { FaUser, FaCog, FaShareAlt, FaLock, FaUserShield, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f6efe7] min-h-screen flex flex-col">

      {/* En-tête */}
      <PageHeader
        title="Politique de confidentialité"
        subtitle="Nous protégeons vos données personnelles avec soin."
      />

      {/* Contenu principal */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10 space-y-8">
        
        {/* 1. Informations collectées */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
<span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">            <FaUser className="text-[#c58a46] text-xl rounded-full" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Informations que nous collectons</h2>
            <p className="text-gray-700 leading-7">
              Nous collectons les informations que vous fournissez directement lors de la création d’un compte, 
              de la passation d’une commande ou de vos communications avec nous : nom, email, adresse de livraison, 
              informations de paiement et historique de commandes.
            </p>
          </div>
        </div>

        {/* 2. Utilisation des informations */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
<span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">            <FaCog className="text-[#c58a46] text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Comment nous utilisons vos informations</h2>
            <p className="text-gray-700 leading-7">
              Nous utilisons vos données pour traiter vos commandes, communiquer avec vous, 
              vous envoyer des offres promotionnelles (avec votre consentement) et améliorer nos services.
            </p>
          </div>
        </div>

        {/* 3. Partage des informations */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
<span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">            <FaShareAlt className="text-[#c58a46] text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Partage des informations</h2>
            <p className="text-gray-700 leading-7">
              Nous ne vendons jamais vos données personnelles. Elles sont partagées uniquement avec nos prestataires 
              (paiement, livraison) dans la limite nécessaire pour assurer nos services.
            </p>
          </div>
        </div>

        {/* 4. Sécurité des données */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
          <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">             
              <FaLock className="text-[#c58a46] text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Sécurité des données</h2>
            <p className="text-gray-700 leading-7">
              Nous appliquons des mesures techniques et organisationnelles pour protéger vos données 
              contre tout accès non autorisé. Cependant, aucune transmission Internet n’est totalement sécurisée.
            </p>
          </div>
        </div>

        {/* 5. Vos droits */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
          <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">
            <FaUserShield className="text-[#c58a46] text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Vos droits</h2>
            <p className="text-gray-700 leading-7">
              Vous pouvez accéder, corriger ou supprimer vos données personnelles. 
              Vous pouvez aussi vous désinscrire de nos communications marketing à tout moment 
              en nous contactant.
            </p>
          </div>
        </div>

        {/* 6. Contact */}
        <div className="bg-white rounded-2xl p-8 shadow-md flex gap-4">
          <span className="w-12 h-12 min-w-[3rem] rounded-full bg-[#f9eae4] flex items-center justify-center shrink-0">
            <FaEnvelope className="text-[#c58a46] text-xl" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Contact</h2>
            <p className="text-gray-700 leading-7">
              Pour  toute  question  concernant  cette  politique, contactez-nous à 
              <strong> privacy@kofeo.ma </strong> ou par téléphone au <strong> +212 6 12 34 56 78</strong>.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PrivacyPolicy;