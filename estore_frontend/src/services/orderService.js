import axios from "axios";

const API_BASE = "/api/orders";

export const createOrder = async (userId, orderDto) => {
  const res = await axios.post(`${API_BASE}/create/${userId}`, orderDto);
  return res.data;
};

/** Historique des commandes validées ; renvoie [] si aucune commande ou erreur réseau. */
export const getValidatedOrderHistory = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE}/user/${userId}/history`);
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
};
