import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";

export const getCustomers = async (jwt) => {
  try {
    const options = {
      url: API_BASE_URL + "/customer/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": jwt,
      },
    };
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
