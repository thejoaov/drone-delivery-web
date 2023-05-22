import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:3333",
});

export default apiInstance;
