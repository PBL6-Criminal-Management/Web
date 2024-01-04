import axios from "./axios";
import Cookies from "js-cookie";

export const getAllCases = async (searchValue, filter, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const params = {};

    if (searchValue !== "" && searchValue !== undefined) {
      params.Keyword = searchValue;
    }

    if (filter.status !== "") {
      params.Status = filter.status;
    }

    if (filter.area !== "") {
      params.Area = filter.area;
    }

    if (filter.timeTakesPlace !== "") {
      params.TimeTakesPlace = filter.timeTakesPlace;
    }

    if (filter.typeOfViolation !== "") {
      params.TypeOfViolation = filter.typeOfViolation;
    }
    const response = await axios.get(`/api/v1/case`, {
      params,
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

export const getCaseById = async (caseId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.get(`/api/v1/case/${caseId}`, {
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

export const deleteCase = async (caseId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.delete(`/api/v1/case/${caseId}`, {
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

export const addCase = async (caseVal, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.post("/api/v1/case", caseVal, {
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

export const editCase = async (casee, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.put(`/api/v1/case`, casee, {
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
