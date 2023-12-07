import axios from './axios';
import Cookies from 'js-cookie';

export const getAllReports = async (searchValue) => {
    const token = Cookies.get('token');
    
    try {
        const params = {};
    
        if (searchValue !== '' && searchValue !== undefined) {
            params.Keyword = searchValue;
        }

        const response = await axios.get(`/api/v1/report`, {
            params,
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