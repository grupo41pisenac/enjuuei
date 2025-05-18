// src/apiConfig.js

const API_BASE = "http://localhost:3000"; // Edite aqui se mudar

export const API_URLS = {
  // Usuário
  register: `${API_BASE}/user`,
  login: `${API_BASE}/auth/login`,
  updateUser: `${API_BASE}/user`,
  userChart: `${API_BASE}/user/chart`,

  // Produtos
  listProducts: `${API_BASE}/product`,
  createProduct: `${API_BASE}/product`,
  updateProduct: (id) => `${API_BASE}/product/${id}`,
  deleteProduct: (id) => `${API_BASE}/product/${id}`,
  getProductById: (id) => `${API_BASE}/product/${id}`,

  // Categorias
  listCategories: `${API_BASE}/product/category`,
};
