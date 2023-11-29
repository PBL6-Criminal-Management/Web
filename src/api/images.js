import axios from './axios';
import Cookies from 'js-cookie';

export const uploadImage = async (formData) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.post('/api/v1/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
}