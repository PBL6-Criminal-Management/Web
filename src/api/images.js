import axios from "./axios";
import Cookies from "js-cookie";

export const uploadImage = async (formData, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.post("/api/v1/upload", formData, {
      headers: {
        Authorization: `Bearer ${result.data}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};
