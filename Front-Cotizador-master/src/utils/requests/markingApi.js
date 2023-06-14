import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";

export const getMarkings = async (jwt) => {
  try {
    const options = {
      url: API_BASE_URL + "/marking/",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": jwt,
      },
    };
    let res = (await axios.request(options)).data;
    res = res.sort((a, b) => {
      if (a.name < b.name) return -1;
      else return 1;
    });
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};
