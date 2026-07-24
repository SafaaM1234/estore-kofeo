import axios from "axios";

const API_BASE = "/api/inventory";

export const getInventory = async (productId) => {
  const res = await axios.get(`${API_BASE}/${productId}`);
  return res.data;
};

export const createInventory = async (data) => {
  const res = await axios.post(`${API_BASE}`, data);
  return res.data;
};

export const decreaseStock = async (productId, quantity) => {
  const res = await axios.put(`${API_BASE}/${productId}/decrease/${quantity}`);
  return res.data;
};

export const increaseStock = async (productId, quantity) => {
  const res = await axios.put(`${API_BASE}/${productId}/increase/${quantity}`);
  return res.data;
};

export const deleteInventory = async (productId) => {
  const res = await axios.delete(`${API_BASE}/${productId}`);
  return res.data;
};
