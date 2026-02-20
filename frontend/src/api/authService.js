import axios from "axios";

const api = axios.create(
    {
        baseURL: "http://127.0.0.1:5000/api"
    }
)

const register = async (data) => {
    const response = await api.post("/register", data);
    return response.data;
}

const login = async (data) => {
    const response = await api.post("/login", data);
    return response.data;
}

export { register, login };