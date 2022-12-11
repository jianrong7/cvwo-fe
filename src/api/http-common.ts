import axios from "axios";
import { getCookie } from "typescript-cookie";

const authorizationHeader = getCookie("Authorization")
  ? `Bearer ${getCookie("Authorization")}`
  : "";
const config = {
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
    Authorization: authorizationHeader,
  },
};

export default axios.create(config);
