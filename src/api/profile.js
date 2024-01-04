import axios from "./axios";

export const getProfile = async (token) => {
    try {
        const response = await axios.get("/api/v1/profile", {
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
};

export const editProfile = async (user, auth) => {
    let result = await auth.refreshToken();
    if (!result.isSuccessfully) {
        throw new Error(result.data);
    }

    try {
        const response = await axios.put("/api/v1/profile", user, {
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
}

