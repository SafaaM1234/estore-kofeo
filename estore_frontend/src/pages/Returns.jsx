import React from "react";
import PageHeader from "../components/common/PageHeader";
import { FaUndo,FaUndoAlt, FaShieldAlt, FaTimesCircle, FaPhone, FaEnvelope,FaExchangeAlt  } from "react-icons/fa";
import { LuUndo2 } from "react-icons/lu";
const Returns = () => {
  return (
    <div className="bg-[#f6efe7] min-h-screen flex flex-col">

      {/* En-tête de page */}
      <PageHeader
        title="Retours & Remboursements"
        subtitle="Politique claire et transparente pour vos achats café."
      />

      {/* Contenu principal */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#1A0F0A] flex items-center gap-3">
            
              <FaUndo  className="text-[#c58a46] text-xl" />
            
            Conditions de retour
          </h2>

          <p className="text-gray-700 leading-8">
            Chez Kofeo, votre satisfaction est notre priorité.
            Vous pouvez retourner vos produits dans un délai de <strong>14 jours </strong>
            après réception, à condition qu’ils soient non utilisés et dans leur emballage d’origine.
          </p>

          <div className="mt-6 text-gray-700 leading-8 space-y-3">
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaShieldAlt className="text-[#c58a46]" />
              </span>
              Retour gratuit pour produits défectueux
            </p>
            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <LuUndo2  className="text-[#c58a46]" />
              </span>
              Remboursement sous 7 jours après validation
            </p>

            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaExchangeAlt className="text-[#c58a46]" />
              </span>
                Produits défectueux remplacés sans frais supplémentaires            </p>

            <p className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                <FaTimesCircle className="text-[#c58a46]" />
              </span>
              Les articles ouverts (grains/capsules) ne sont pas retournables
            </p>
          </div>

          {/* Procédure en étapes */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-6 text-[#1A0F0A]">
              Procédure de retour
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
              {/* Trait coloré */}
              <div className="w-2 h-12 bg-[#f9eae4] rounded-full"></div>
                  <p className="text-gray-700 leading-7">
                  <strong>Étape 1 :</strong> Contactez notre service client avec votre numéro de commande.
                </p>
             </div>
               <div className="flex items-start gap-4">
              {/* Trait coloré */}
              <div className="w-2 h-12 bg-[#f9eae4] rounded-full"></div>
                <p className="text-gray-700 leading-7">
                  <strong>Étape 2 :</strong> Emballez soigneusement le produit dans son emballage d’origine.
                </p>
              </div>
              <div className="flex items-start gap-4">
               <div className="w-2 h-12 bg-[#f9eae4] rounded-full"></div>
                 <p className="text-gray-700 leading-7">
                  <strong>Étape 3 :</strong> Déposez le colis dans un point relais ou convenez d’un enlèvement.
                 </p>
                </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-12 bg-[#f9eae4] rounded-full"></div>
                  <p className="text-gray-700 leading-7">
                   <strong>Étape 4 :</strong> Recevez votre remboursement ou remplacement après inspection.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Returns;