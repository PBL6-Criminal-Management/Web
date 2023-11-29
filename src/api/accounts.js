
import axios from './axios';
import Cookies from 'js-cookie';

// Function to get account by ID
export const getAccountById = async (accountId) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.get(`/api/v1/account/${accountId}`, {
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

export const editAccount = async (account) => {
    const token = Cookies.get('token');
    try {
        const response = await axios.put('/api/v1/account', account, {
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

export const getAllAccounts = async () => {
    const token = Cookies.get('token');
    
    try {
        const response = await axios.get(`/api/v1/account`, {
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

