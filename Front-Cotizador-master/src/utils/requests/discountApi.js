import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";

export const getDiscounts = async (jwt) => {
  try {
    const options = {
      url: API_BASE_URL + "/discount/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": jwt,
      },
    };
    const res = (await axios.request(options)).data;
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};
