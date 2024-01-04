import axios from './axios';

export const uploadImage = async (formData, config) => {
    try {
        const response = await axios.post('/api/v1/upload', formData, config);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
}

export const deleteImage = async (filePath) => {
    try {
        const response = await axios.delete(`/api/v1/upload?filePath=${filePath}`);
        return response.data.messages;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
}

export const splitVideo = async (formData, config) => {
    try {
        const response = await axios.post('/api/v1/upload/split-video', formData, config);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
}
