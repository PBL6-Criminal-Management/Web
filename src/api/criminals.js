
import axios from './axios';
import Cookies from 'js-cookie';

export const getAllCriminals = async () => {
    const token = Cookies.get('token');
    
    try {
        const response = await axios.get(`/api/v1/criminal`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
};

