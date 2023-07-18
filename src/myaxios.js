import axios from "axios";
const myaxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export default myaxios;
