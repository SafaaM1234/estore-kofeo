import axios from "axios";

const API_BASE = "/api";

export const getAllCustomers = async () => {
  const res = await axios.get(`${API_BASE}/customers`);
  return res.data.content || res.data.data || res.data;
};

export const getCustomerById = async (id) => {
  const res = await axios.get(`${API_BASE}/customers/${id}`);
  return res.data;
};

export const updateProfile = async (userId, data) => {
  const res = await axios.put(`${API_BASE}/customers/${userId}/profile`, data);
  return res.data;
};

export const deleteProfile = async (profileId) => {
  const res = await axios.delete(`${API_BASE}/customers/profile/${profileId}`);
  return res.data;
};

export const getOrdersByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/orders/user/${userId}`);
  return res.data;
};
