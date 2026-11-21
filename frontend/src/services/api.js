import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 90000,
});

export const generateWorkoutPlan = async (preferences) => {
  const response = await api.post('/generate-plan', { preferences });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/');
  return response.data;
};

export default api;
