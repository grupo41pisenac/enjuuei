import axios from "axios";
import { API_URLS } from "../apiConfig";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Usuário
export const registerUser = (data) => axios.post(API_URLS.register, data);
export const loginUser = (data) => axios.post(API_URLS.login, data);
export const updateUser = (data) => axios.patch(API_URLS.updateUser, data, authHeaders());
export const getUserChart = () => axios.get(API_URLS.userChart, authHeaders());

// Produtos
export const getProducts = () => axios.get(API_URLS.listProducts);
export const getProductById = (id) => axios.get(API_URLS.getProductById(id), authHeaders());
export const createProduct = (data) => axios.post(API_URLS.createProduct, data, authHeaders());
export const updateProduct = (id, data) => axios.patch(API_URLS.updateProduct(id), data, authHeaders());
export const deleteProduct = (id) => axios.delete(API_URLS.deleteProduct(id), authHeaders());

// Categorias
export const getCategories = () => axios.get(API_URLS.listCategories, authHeaders());
