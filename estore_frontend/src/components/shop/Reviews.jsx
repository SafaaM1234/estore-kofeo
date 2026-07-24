import React, { useEffect, useState, useCallback } from "react";
import {
  getReviewsByProduct,
  getRatingByProduct,
  createReview,
} from "../../services/reviewService";
import { getValidatedOrderHistory } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";
import userImage from "../../assets/images/users/user.jpeg";

const Reviews = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({ averageRating: 0, count: 0 });
  const [hasPurchased, setHasPurchased] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formRating, setFormRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setFormError(null);
    try {
      const [reviewsData, ratingData] = await Promise.all([
        getReviewsByProduct(productId),
        getRatingByProduct(productId),
      ]);
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      setRating(ratingData || { averageRating: 0, count: 0 });

      if (user?.id) {
        const mine = (Array.isArray(reviewsData) ? reviewsData : []).some(
          (r) => String(r.userId) === String(user.id)
        );
        setAlreadyReviewed(mine);

        const orders = await getValidatedOrderHistory(user.id);
        const bought = orders.some((o) =>
          (o.items || []).some((it) => String(it.productId) === String(productId))
        );
        setHasPurchased(bought);
      } else {
        setHasPurchased(false);
        setAlreadyReviewed(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [productId, user?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setFormError(null);
    setFormSuccess(null);
    setSubmitting(true);
    try {
      await createReview({
        userId: user.id,
        productId,
        rating: formRating,
        comment: comment.trim(),
      });
      setComment("");
      setFormSuccess("Merci ! Votre avis a été publié.");
      await refresh();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "Impossible d'envoyer votre avis.";
      setFormError(typeof msg === "string" ? msg : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const canWrite = user && hasPurchased && !alreadyReviewed;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Avis clients</h3>
        <div className="flex items-center gap-2">
          <p className="text-amber-400 text-lg">
            {"★".repeat(Math.round(rating.averageRating || 0))}
          </p>
          <span className="text-gray-500 text-sm">
            ({rating.count || 0} avis)
          </span>
        </div>
      </div>

      {user && !hasPurchased && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Seuls les clients ayant acheté ce produit (commande validée) peuvent
          laisser un avis.
        </p>
      )}
      {user && alreadyReviewed && (
        <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
          Vous avez déjà publié un avis pour ce produit.
        </p>
      )}
      {!user && (
        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          Connectez-vous pour voir si vous pouvez laisser un avis après achat.
        </p>
      )}

      {canWrite && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#E0D6C8] bg-[#FAF8F5] p-4 space-y-3"
        >
          <p className="text-sm font-medium text-[#1A0F0A]">
            Votre avis (achat vérifié)
          </p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFormRating(n)}
                className={`text-2xl leading-none ${
                  n <= formRating ? "text-amber-400" : "text-gray-300"
                }`}
                aria-label={`${n} sur 5`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="relative">
            <textarea
              required
              minLength={3}
              maxLength={500}
              rows={4}
              placeholder="Partagez votre expérience avec ce produit…"
              className="w-full rounded-lg border border-[#E0D6C8] px-3 py-2 text-sm resize-none bg-white"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-400">
              {comment.length}/500
            </span>
          </div>
          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}
          {formSuccess && (
            <p className="text-sm text-emerald-700">{formSuccess}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-lg bg-[#1A0F0A] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#2d1a12] disabled:opacity-50"
          >
            {submitting ? "Envoi…" : "Publier mon avis"}
          </button>
        </form>
      )}

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Tous les avis
        </h4>
        {loading ? (
          <p className="text-gray-500 text-sm">Chargement des avis…</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun avis pour ce produit.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/80"
              >
                <img
                  src={userImage}
                  alt="Utilisateur"
                  className="w-10 h-10 rounded-full object-cover shrink-0 bg-gray-200"
                />
                <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                    {`${r.userFirstName || ""} ${r.userLastName || ""}`.trim() || "Utilisateur"}
                  </p>
                  <p className="text-amber-500 text-sm mt-0.5">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-400 text-xs ml-1">
                      ({r.rating}/5)
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                    {r.comment}
                  </p>
                  {r.verifiedPurchase && (
                    <p className="text-xs text-emerald-600 mt-1">
                      Achat vérifié
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reviews;
