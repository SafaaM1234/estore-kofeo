import axios from "axios";

const API_BASE = "/api/cart";

export const createCart = async (userId) => {
  const res = await axios.post(`${API_BASE}/create/${userId}`);
  return res.data;
};

export const getCartByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/user/${userId}`);
  return res.data;
};

export const addItem = async (cartId, itemDto) => {
  const res = await axios.post(
    `${API_BASE}/${cartId}/add/${itemDto.productId}`,
    itemDto
  );
  return res.data;
};

export const updateItemQuantity = async (itemId, quantity) => {
  const res = await axios.put(`${API_BASE}/item/${itemId}/update/${quantity}`);
  return res.data;
};

export const removeItem = async (itemId) => {
  const res = await axios.delete(`${API_BASE}/item/${itemId}`);
  return res.data;
};

export const clearCart = async (cartId) => {
  const res = await axios.delete(`${API_BASE}/${cartId}/clear`);
  return res.data;
};
