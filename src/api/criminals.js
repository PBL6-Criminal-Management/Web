
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

export const getCriminalById = async (criminalId) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.get(`/api/v1/criminal/${criminalId}`, {
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
}

export const getWantedCriminalById = async (criminalId) => {
    try {
        const response = await axios.get(`/api/v1/criminal/${criminalId}`);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.messages);
        }
    }
}

export const editCriminal = async (criminal) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.put('/api/v1/criminal', criminal, {
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
}

