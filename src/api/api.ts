import axios from 'axios';

const API_BASE_URL = 'https://backend-loan-manager.onrender.com';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: 'user' | 'verifier' | 'admin'
) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    name,
    email,
    password,
    role,
  });
  return response.data;
};
export const fetchAllAdmins = async () => {
  const res = await axios.get('https://backend-loan-manager.onrender.com/admins/all', {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
};

export const deleteAdminById = async (id: number) => {
  await axios.delete(`https://backend-loan-manager.onrender.com/admins/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
