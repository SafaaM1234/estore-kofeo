
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Home, Coffee, User, ShoppingCart, Menu, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, openCart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Accueil", path: "/", icon: <Home size={15} /> },
    { label: "Magasin", path: "/shop", icon: <Coffee size={15} /> },
    { label: "Profil", path: "/profile", icon: <User size={15} /> },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0D0705] shadow-xl shadow-black/30"
          : "bg-[#1A0F0A]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#C68642] rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-md shadow-[#C68642]/30">
              <Coffee size={19} className="text-white" />
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-white text-[18px] tracking-tight">
                kofeo
              </div>
              <div className="text-[#C68642] text-[9px] tracking-[0.2em] uppercase font-semibold">
                Premium Coffee
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={clsx(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  location.pathname === l.path
                    ? "bg-[#C68642] text-white shadow-md shadow-[#C68642]/25"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                )}
              >
                {l.icon}
                {l.label}
              </Link>
            ))}
          </div>

          {/* Cart + burger */}
          <div className="flex items-center gap-1">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C68642] rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2.5 rounded-xl text-white/65 hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          
          
          {/* USER */}
          {user && (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D0705] border-t border-white/8 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setMobileOpen(false)}
              className={clsx(
                "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                location.pathname === l.path
                  ? "bg-[#C68642] text-white"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              )}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
