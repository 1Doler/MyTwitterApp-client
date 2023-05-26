import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-back-production-2b18.up.railway.app/",
});

export default instance;
