import axios from "./axios";
import Cookies from "js-cookie";

export const getAllCriminals = async (searchValue, filter, auth) => {
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

    if (filter.yearOfBirth !== "" && !isNaN(filter.yearOfBirth)) {
      params.YearOfBirth = filter.yearOfBirth;
    }

    if (filter.gender !== "") {
      params.Gender = filter.gender;
    }

    if (filter.characteristic !== "") {
      params.Characteristics = filter.characteristic;
    }

    if (filter.charge !== "") {
      params.Charge = filter.charge;
    }

    if (filter.typeOfViolation !== "") {
      params.TypeOfViolation = filter.typeOfViolation;
    }

    params.OrderBy = 'id DESC';
    const response = await axios.get(`/api/v1/criminal`, {
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

export const getCriminalById = async (criminalId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.get(`/api/v1/criminal/${criminalId}`, {
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

export const addCriminal = async (criminal, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.post("/api/v1/criminal", criminal, {
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

export const editCriminal = async (criminal, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.put("/api/v1/criminal", criminal, {
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

export const deleteCriminal = async (criminalId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.delete(`/api/v1/criminal/${criminalId}`, {
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
