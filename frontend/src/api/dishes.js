// all api calls to the backend are here
// one place to update if the base url or endpoints change

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// fetchAllDishes — GET /api/dishes
// returns the full dish list from the server
export async function fetchAllDishes() {
  const response = await api.get("/api/dishes");
  return response.data.data;
}

// toggleDishPublished — PATCH /api/dishes/:dishId/toggle
// flips isPublished for one dish, returns the updated dish
export async function toggleDishPublished(dishId) {
  const response = await api.patch(`/api/dishes/${dishId}/toggle`);
  return response.data.data;
}
