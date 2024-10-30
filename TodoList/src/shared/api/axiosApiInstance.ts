import axios from "axios";
import { LS_TOKEN } from "@/shared/constants/constants";

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem(LS_TOKEN))}`,
  },
});
const updateInstance = () => {
  $api.defaults.headers["Authorization"] = `Bearer ${JSON.parse(
    localStorage.getItem(LS_TOKEN)
  )}`;
};

export { $api, updateInstance };
