import axios from "axios";

const API_BASE = "/api/catalog";

export const getAllProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  console.log("Réponse produits:", res.data); 
  return res.data.content || res.data.data || res.data;
};

export const getAllCategories = async () => {
  const res = await axios.get(`${API_BASE}/categories`);
  return res.data;
};

export const searchProducts = async (keyword) => {
  const res = await axios.get(`${API_BASE}/products/search`, {
    params: { keyword },
  });
  return res.data;
};

export const getProductsByCategory = async (categoryId) => {
  const res = await axios.get(`${API_BASE}/categories/${categoryId}/products`);
  return res.data.content || res.data.data || res.data;
};

export const getBestSellers = async () => {
  const res = await axios.get(`${API_BASE}/products/best-sellers`);
  return res.data.content || res.data.data || res.data;
};
