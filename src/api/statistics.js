import axios from "./axios";

export const getCriminalStructure = async (year, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.get(`/api/v1/statistic/criminal-structure?Year=${year}`, {
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

export const getSocialOrderSituation = async (month, year, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.get(
      `/api/v1/statistic/social-order-situation?Month=${month}${year
        .map((y) => `&Year=${y}`)
        .join("")}`,
      {
        headers: {
          Authorization: `Bearer ${result.data}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};
export const getSituationDevelopments = async (year, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.get(
      `/api/v1/statistic/criminal-situation-developments?Year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${result.data}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};
