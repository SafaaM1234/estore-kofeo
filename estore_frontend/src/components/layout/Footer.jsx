import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaFileContract,
  FaQuestionCircle,
  FaHeart,
} from "react-icons/fa";
import { TbCoffee } from "react-icons/tb";
import {  Coffee } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-[#1A0F0A] text-white px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Gauche */}
        <div>
          {/* Logo cliquable */}
          <Link to="/" className="flex items-center gap-4 hover:opacity-90 transition">
            <div className="w-11 h-11 rounded-full bg-[#c58a46] flex items-center justify-center">
              <Coffee className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white leading-none">Kofeo</h2>
              <p className="text-[#c58a46] text-sm tracking-[0.25em] uppercase mt-1">
                Premium Coffee
              </p>
            </div>
          </Link>

          <p className="text-gray-400 mt-5 leading-8 max-w-sm">
            Votre destination premium pour tout ce qui est café.
            Grains d’exception, machines de qualité et accessoires professionnels.
          </p>

          {/* Réseaux sociaux */}
          <div className="flex gap-4 mt-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-[#211612] flex items-center justify-center 
                         text-[#c58a46] hover:bg-[#2a201c] transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-[#211612] flex items-center justify-center 
                         text-[#c58a46] hover:bg-[#2a201c] transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-[#211612] flex items-center justify-center 
                         text-[#c58a46] hover:bg-[#2a201c] transition duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Milieu */}
        <div className="md:flex md:flex-col md:items-center">
          <h3 className="text-white font-semibold tracking-widest mb-6 text-center">
            SUPPORT
          </h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-3">
              <FaTruck className="text-[#c58a46]" />
              <Link to="/delivery-info" className="hover:text-[#c58a46] transition">
                Informations de livraison
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <FaUndo className="text-[#c58a46]" />
              <Link to="/returns" className="hover:text-[#c58a46] transition">
                Retours & Remboursements
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <FaShieldAlt className="text-[#c58a46]" />
              <Link to="/privacy-policy" className="hover:text-[#c58a46] transition">
                Politique de confidentialité
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <FaFileContract className="text-[#c58a46]" />
              <Link to="/terms" className="hover:text-[#c58a46] transition">
                Conditions d’utilisation
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <FaQuestionCircle className="text-[#c58a46]" />
              <Link to="/faq" className="hover:text-[#c58a46] transition">
                FAQ & Aide
              </Link>
            </li>
          </ul>
        </div>

        {/* Droite */}
        <div className="md:flex md:flex-col md:items-center">
          <h3 className="text-white font-semibold tracking-widest mb-6 text-center">
            CONTACT
          </h3>
          <div className="space-y-4 text-gray-400">
            <p className="flex items-center gap-3 hover:text-[#c58a46] transition">
              <FaEnvelope className="text-[#c58a46]" />
              contact@kofeo.com
            </p>
            <p className="flex items-center gap-3 hover:text-[#c58a46] transition">
              <FaPhone className="text-[#c58a46]" />
              +212 6 12 34 56 78
            </p>
            <p className="flex items-center gap-3 hover:text-[#c58a46] transition">
              <FaClock className="text-[#c58a46]" />
              Lun–Sam : 9h–13h & 14h–18h
            </p>
            <p className="flex items-center gap-3 hover:text-[#c58a46] transition">
              <FaMapMarkerAlt className="text-[#c58a46]" />
              Casablanca, Maroc
            </p>
          </div>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-[#2a201c] mt-10 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
        <p>© 2026 Kofeo. Tous droits réservés.</p>
        <p className="flex items-center gap-2">
          Fait avec <FaHeart className="text-[#c58a46]" /> au Maroc
        </p>
      </div>
    </footer>
  );
};

export default Footer;