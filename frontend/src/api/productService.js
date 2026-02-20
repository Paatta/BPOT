import axios from "axios";
import useAuth from "../hooks/useAuth";

const api = axios.create(
    {
        baseURL: "http://127.0.0.1:5000/api"
    }
)

const getAllProducts = async (token) => {
    
    const response = await api.get("/products", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

const getProductById = async (id, token) => {
    const response = await api.get(`/products/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}
const createProduct = async (data, token) => {
    const response = await api.post("/create", data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

const updateProduct = async (id, data, token) => {
    const response = await api.patch(`/update/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

const deleteProduct = async (id, token) => {   
    const response = await api.delete(`/products/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}

const getCategories = async (token) => {
    const response = await api.get('/products/categories', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories };