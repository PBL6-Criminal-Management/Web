import axios from "./axios";

export const getAllReports = async (searchValue, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }

  try {
    const params = {};

    if (searchValue !== "" && searchValue !== undefined) {
      params.Keyword = searchValue;
    }

    params.OrderBy = 'id DESC';
    const response = await axios.get(`/api/v1/report`, {
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

export const getReportById = async (reportId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.get(`/api/v1/report/${reportId}`, {
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

export const addReport = async (report) => {
  try {
    const response = await axios.post("/api/v1/report", report);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.messages);
    }
  }
};

export const editReport = async (report, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.put("/api/v1/report", report, {
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

export const deleteReport = async (reportId, auth) => {
  let result = await auth.refreshToken();
  if (!result.isSuccessfully) {
    throw new Error(result.data);
  }
  try {
    const response = await axios.delete(`/api/v1/report/${reportId}`, {
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
