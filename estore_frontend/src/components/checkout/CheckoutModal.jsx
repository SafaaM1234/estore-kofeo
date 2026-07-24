import React, { useEffect, useMemo, useState } from "react";
import { X, ArrowRight, CreditCard, MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../services/orderService";

const SITE_FEEDBACK_KEY = "kofeo_site_feedback";

const formatOrderRef = (orderId) =>
  `#CAF-2026-${String(orderId ?? Math.floor(1000 + Math.random() * 9000)).padStart(4, "0")}`;

const CheckoutModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart, closeCart } = useCart();

  const [step, setStep] = useState("address");
  const [toast, setToast] = useState(null);
  const [orderRef, setOrderRef] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [siteReview, setSiteReview] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (!open) return;
    setStep("address");
    setToast(null);
    setOrderRef("");
    setSubmitting(false);
    setAddress({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      postalCode: "",
    });
    setPayment({ cardNumber: "", expiry: "", cvc: "" });
    setSiteReview({ name: "", role: "", rating: 5, comment: "" });
  }, [open]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (s, i) => s + i.unitPrice * i.quantity,
      0
    );
    return { subtotal, total: subtotal };
  }, [cartItems]);

  const resetAndClose = () => {
    setStep("address");
    setAddress({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      postalCode: "",
    });
    setPayment({ cardNumber: "", expiry: "", cvc: "" });
    setSiteReview({ name: "", role: "", rating: 5, comment: "" });
    setOrderRef("");
    setToast(null);
    onClose();
  };

  if (!open) return null;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setSubmitting(true);
    try {
      const items = cartItems.map((i) => ({
        productId: i.id,
        productName: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      }));
      const orderDto = {
        totalAmount: totals.total,
        status: "VALIDATED",
        userId: user.id,
        items,
      };
      const created = await createOrder(user.id, orderDto);
      const ref = formatOrderRef(created.id);
      setOrderRef(ref);
      clearCart();
      closeCart();
      setToast("Commande créée avec succès ! Merci pour votre confiance.");
      setStep("success");
      setTimeout(() => setToast(null), 5000);
    } catch (err) {
      console.error(err);
      setToast("Impossible de finaliser la commande. Réessayez plus tard.");
      setTimeout(() => setToast(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const persistSiteReview = () => {
    const entry = {
      ...siteReview,
      createdAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(SITE_FEEDBACK_KEY) || "[]");
      prev.unshift(entry);
      localStorage.setItem(SITE_FEEDBACK_KEY, JSON.stringify(prev.slice(0, 50)));
    } catch {
      localStorage.setItem(SITE_FEEDBACK_KEY, JSON.stringify([entry]));
    }
    window.dispatchEvent(new Event("kofeo-site-feedback"));
  };

  const handleSiteReviewSubmit = (e) => {
    e.preventDefault();
    if (!siteReview.name.trim() || !siteReview.role.trim() || !siteReview.comment.trim()) return;
    persistSiteReview();
    resetAndClose();
    navigate("/home");
  };

  const progress = step === "address" ? 50 : step === "payment" ? 100 : 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 rounded-xl bg-[#1A0F0A] text-white px-4 py-3 shadow-lg text-sm max-w-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-lg">
            ✓
          </span>
          <span>{toast}</span>
        </div>
      )}

      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={resetAndClose}
          className="absolute right-4 top-4 text-[#1A0F0A]/50 hover:text-[#C68642] z-10"
          aria-label="Fermer"
        >
          <X size={22} />
        </button>

        {step === "address" && (
          <form onSubmit={handleAddressSubmit} className="p-6 pt-10">
            <h2 className="text-xl font-bold text-[#1A0F0A] pr-10">
              Adresse de livraison
            </h2>
            <div className="mt-3 h-1.5 w-full rounded-full bg-[#E8E0D8] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#A67449] to-[#63412B] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm font-medium text-[#1A0F0A]">
                Prénom *
                <input
                  required
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={address.firstName}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, firstName: e.target.value }))
                  }
                />
              </label>
              <label className="text-sm font-medium text-[#1A0F0A]">
                Nom *
                <input
                  required
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={address.lastName}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, lastName: e.target.value }))
                  }
                />
              </label>
            </div>
            <label className="mt-3 block text-sm font-medium text-[#1A0F0A]">
              Email *
              <input
                required
                type="email"
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                value={address.email}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, email: e.target.value }))
                }
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-[#1A0F0A]">
              Téléphone *
              <input
                required
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                value={address.phone}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, phone: e.target.value }))
                }
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-[#1A0F0A]">
              Adresse *
              <input
                required
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                value={address.street}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, street: e.target.value }))
                }
              />
            </label>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm font-medium text-[#1A0F0A]">
                Ville *
                <input
                  required
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={address.city}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, city: e.target.value }))
                  }
                />
              </label>
              <label className="text-sm font-medium text-[#1A0F0A]">
                Code postal *
                <input
                  required
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, postalCode: e.target.value }))
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#A67449] to-[#63412B] py-3 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95"
            >
              Continuer vers le paiement
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {step === "payment" && (
          <form onSubmit={handlePaymentSubmit} className="p-6 pt-10">
            <h2 className="text-xl font-bold text-[#1A0F0A] pr-10 flex items-center gap-2">
              <CreditCard size={22} className="text-[#C68642]" />
              Paiement
            </h2>
            <div className="mt-3 h-1.5 w-full rounded-full bg-[#E8E0D8] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#A67449] to-[#63412B] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-5 rounded-xl bg-[#F5F1EE] p-4 text-sm">
              <p className="font-semibold text-[#1A0F0A] mb-2">Récapitulatif</p>
              <ul className="space-y-1 text-[#4A3F36] max-h-28 overflow-y-auto">
                {cartItems.map((i) => (
                  <li key={i.id} className="flex justify-between gap-2">
                    <span className="truncate">
                      {i.name} × {i.quantity}
                    </span>
                    <span className="font-medium whitespace-nowrap">
                      {(i.unitPrice * i.quantity).toFixed(2)} MAD
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between font-bold text-[#1A0F0A] border-t border-[#E0D6C8] pt-2">
                <span>Total</span>
                <span>{totals.total.toFixed(2)} MAD</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#6B5B4A]">
              Ceci est une démonstration : aucun paiement réel n&apos;est effectué.
            </p>

            <label className="mt-4 block text-sm font-medium text-[#1A0F0A]">
              Numéro de carte
              <input
                required
                inputMode="numeric"
                autoComplete="off"
                placeholder="4242 4242 4242 4242"
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm tracking-widest"
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment((p) => ({ ...p, cardNumber: e.target.value }))
                }
              />
            </label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-sm font-medium text-[#1A0F0A]">
                Expiration (MM/AA)
                <input
                  required
                  placeholder="12/28"
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={payment.expiry}
                  onChange={(e) =>
                    setPayment((p) => ({ ...p, expiry: e.target.value }))
                  }
                />
              </label>
              <label className="text-sm font-medium text-[#1A0F0A]">
                CVC
                <input
                  required
                  placeholder="123"
                  className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                  value={payment.cvc}
                  onChange={(e) =>
                    setPayment((p) => ({ ...p, cvc: e.target.value }))
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting || cartItems.length === 0}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#A67449] to-[#63412B] py-3 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting
                ? "Traitement…"
                : `Payer ${totals.total.toFixed(2)} MAD`}
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="mt-3 w-full text-center text-sm text-[#6B5B4A] hover:text-[#C68642]"
              onClick={() => setStep("address")}
            >
              Retour à l&apos;adresse
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-4xl font-bold">
              ✓
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#1A0F0A]">
              Commande confirmée !
            </h2>
            <p className="mt-2 text-[#4A3F36] text-sm">
              Merci pour votre commande ! Votre commande a été confirmée avec
              succès. Vous recevrez un email de confirmation sous peu.
            </p>
            <div className="mt-6 rounded-xl bg-[#F5F1EE] px-4 py-3 text-left">
              <p className="text-xs text-[#6B5B4A]">Numéro de commande</p>
              <p className="text-lg font-bold text-[#1A0F0A]">{orderRef}</p>
            </div>
            <button
              type="button"
              onClick={() => setStep("siteReview")}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#A67449] to-[#63412B] py-3 text-white font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Donner mon avis sur le site
            </button>
            <button
              type="button"
              className="mt-4 text-sm text-[#6B5B4A] hover:text-[#C68642]"
              onClick={resetAndClose}
            >
              Continuer mes achats
            </button>
          </div>
        )}

        {step === "siteReview" && (
          <form onSubmit={handleSiteReviewSubmit} className="p-6 pt-10">
            <h2 className="text-xl font-bold text-[#1A0F0A] pr-10">
              Votre avis compte
            </h2>
            <p className="mt-2 text-sm text-[#6B5B4A]">
              Partagez votre expérience avec notre boutique. Votre avis sera
              affiché sur la page d&apos;accueil !
            </p>

            <label className="mt-5 block text-sm font-medium text-[#1A0F0A]">
              Votre nom *
              <input
                required
                placeholder="Ex : Marie Dupont"
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                value={siteReview.name}
                onChange={(e) =>
                  setSiteReview((s) => ({ ...s, name: e.target.value }))
                }
              />
            </label>
            <label className="mt-3 block text-sm font-medium text-[#1A0F0A]">
              Votre profession / rôle *
              <input
                required
                placeholder="Ex : Barista, Entrepreneur…"
                className="mt-1 w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm"
                value={siteReview.role}
                onChange={(e) =>
                  setSiteReview((s) => ({ ...s, role: e.target.value }))
                }
              />
            </label>
            <div className="mt-3">
              <span className="text-sm font-medium text-[#1A0F0A]">Note</span>
              <div className="mt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setSiteReview((s) => ({ ...s, rating: n }))
                    }
                    className={`text-2xl leading-none ${
                      n <= siteReview.rating
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                    aria-label={`${n} sur 5`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <label className="mt-3 block text-sm font-medium text-[#1A0F0A]">
              Votre avis *
              <div className="relative mt-1">
                <textarea
                  required
                  minLength={3}
                  maxLength={500}
                  rows={4}
                  placeholder="Dites-nous ce que vous avez aimé…"
                  className="w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm resize-none"
                  value={siteReview.comment}
                  onChange={(e) =>
                    setSiteReview((s) => ({ ...s, comment: e.target.value }))
                  }
                />
                <span className="absolute bottom-2 right-2 text-xs text-[#9A8B7E]">
                  {siteReview.comment.length}/500
                </span>
              </div>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#1A0F0A] py-3 text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#2d1a12]"
            >
              <Send size={18} />
              Envoyer mon avis
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
