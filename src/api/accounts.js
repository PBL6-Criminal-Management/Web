import axios from "./axios";
import Cookies from "js-cookie";

// Function to get account by ID
export const getAccountById = async (accountId, auth, token = null) => {
  if (token === null) {
    let result = await auth.refreshToken();
    if (!result.isSuccessfully) {
      throw new Error(result.data);
    }

    try {
      const response = await axios.get(`/api/v1/account/${accountId}`, {
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
  } else {
    try {
      const response = await axios.get(`/api/v1/account/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.messages);
      }
    }
  }
};

export const addAccount = async (account, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.post("/api/v1/account", account, {
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

export const editAccount = async (account, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.put("/api/v1/account", account, {
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

export const getAllAccounts = async (searchValue, filter, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const params = {};

    if (searchValue !== "" && searchValue !== undefined) {
      params.Keyword = searchValue;
    }

    if (filter.role !== "") {
      params.RoleId = filter.role;
    }

    if (filter.area !== "") {
      params.Area = filter.area;
    }

    if (filter.yearOfBirth !== "" && !isNaN(filter.yearOfBirth)) {
      params.YearOfBirth = filter.yearOfBirth;
    }

    const response = await axios.get(`/api/v1/account`, {
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

export const deleteAccount = async (accountId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const response = await axios.delete(`/api/v1/account/${accountId}`, {
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
