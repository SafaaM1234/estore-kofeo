import axios from "axios";

// Créer un avis
export const createReview = async (review) => {
  const res = await axios.post("/api/reviews", review);
  return res.data;
};

// Récupérer les avis d’un produit
export const getReviewsByProduct = async (productId) => {
  const res = await axios.get(`/api/reviews/product/${productId}`);
  return res.data; // tableau de ReviewResponseDto
};

// Récupérer le rating d’un produit
export const getRatingByProduct = async (productId) => {
  const res = await axios.get(`/api/reviews/product/${productId}/rating`);
  return res.data; // { averageRating: 4.2, count: 12 }
};

// Mettre à jour un avis
export const updateReview = async (id, review) => {
  const res = await axios.put(`/api/reviews/${id}`, review);
  return res.data;
};

// Supprimer un avis
export const deleteReview = async (id) => {
  await axios.delete(`/api/reviews/${id}`);
};
