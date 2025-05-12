import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://farmacia-expres-4.onrender.com/api/laboratorios';

export async function getLaboratorios() {
  const token = getToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function crearLaboratorio(data) {
  const token = getToken();
  const response = await axios.post('http://localhost:4000/api/laboratorios', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function eliminarLaboratorio(id) {
  const token = getToken();
  await axios.delete(`https://farmacia-expres-4.onrender.com/api/laboratorios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function editarLaboratorio(id, data) {
  const token = getToken();
  const response = await axios.put(`https://farmacia-expres-4.onrender.com/api/laboratorios/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}