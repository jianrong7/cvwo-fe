import axios from "axios";

const config = {
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  headers: {
    "Content-type": "application/json",
  },
};

export default axios.create(config);
