import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { FaTruck, FaSearch, FaUndo, FaEnvelope } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      icon: <FaTruck className="text-[#c58a46]" />,
      question: "Quels sont les délais de livraison ?",
      answer: "Nos livraisons prennent généralement entre 48h et 72h selon la ville au Maroc."
    },
    {
      icon: <FaSearch className="text-[#c58a46]" />,
      question: "Comment suivre ma commande ?",
      answer: "Dès l’expédition, vous recevez un email avec un lien de suivi pour vérifier l’avancement de votre livraison."
    },
    {
      icon: <FaUndo className="text-[#c58a46]" />,
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous pouvez retourner un produit sous 14 jours après réception, à condition qu’il soit intact et dans son emballage d’origine."
    },
    {
      icon: <FaEnvelope className="text-[#c58a46]" />,
      question: "Comment contacter le service client ?",
      answer: "Notre équipe est disponible par email à support@kofeo.ma ou par téléphone au +212 6 12 34 56 78 pour répondre à toutes vos questions."
    }
  ];

  return (
    <div className="bg-[#f6efe7] min-h-screen flex flex-col">

      {/* En-tête */}
      <PageHeader
        title="FAQ & Aide"
        subtitle="Trouvez rapidement les réponses à vos questions."
      />

      {/* Contenu principal */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-md divide-y divide-[#f3e3d1]">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#f9eae4] flex items-center justify-center">
                    {faq.icon}
                  </span>
                  <h2 className="text-lg font-semibold text-[#1A0F0A]">{faq.question}</h2>
                </div>
                <span className="text-[#c58a46] font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-gray-700 leading-7">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default FAQ;