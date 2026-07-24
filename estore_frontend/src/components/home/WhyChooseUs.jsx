
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { Award, Truck, ShieldCheck } from "lucide-react";

const WhyChooseUs = () => {

  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-[#2a1a12] text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[12px] text-[#c68b3f] uppercase tracking-[0.25em] font-semibold">
          Notre engagement
        </p>
        <h2 className="text-4xl font-playfair font-bold mb-12">
          Pourquoi nous choisir ?
        </h2>

        {/* Trois avantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="bg-[#c68b3f]/15 p-4 rounded-xl mb-4 inline-block">
              <Award size={36} color="#c68b3f" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualité Premium</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sélection rigoureuse des meilleurs grains et machines du monde entier.
              Chaque produit est testé par nos experts baristas avant d’intégrer notre catalogue.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <div className="bg-[#c68b3f]/15 p-4 rounded-xl mb-4 inline-block">
              <Truck size={36} color="#c68b3f" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison Express</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Livraison <span className="text-[#c68b3f] font-semibold">gratuite</span> pour toutes vos commandes.
              Expédition sous 24h, livraison en 2–3 jours ouvrés partout au Maroc.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="500">
            <div className="bg-[#c68b3f]/15 p-4 rounded-xl mb-4 inline-block">
              <ShieldCheck size={36} color="#c68b3f" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Satisfaction Garantie</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              30 jours pour changer d’avis. Service client disponible 6 jours sur 7
              pour répondre à toutes vos questions.
            </p>
          </div>
        </div>

        {/* Bannière Livraison */}
        <div
          data-aos="fade-up"
          data-aos-delay="700"
          className="bg-[#3a2415] rounded-xl py-8 px-6 flex flex-col md:flex-row items-center justify-between border-l-4 border-[#c68b3f]"        
             >          
          <div>
            <h3 className="text-2xl font-playfair font-bold text-[#c68b3f]">
              Livraison gratuite
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Profitez de la livraison express offerte sur toutes vos commandes kofeo.
            </p>
          </div>
          <button
              onClick={() => navigate("/shop")}
              className="mt-6 md:mt-0 bg-[#c68b3f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a8742f] transition"
          >
            Commander maintenant
          </button>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
