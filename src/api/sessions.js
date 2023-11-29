
import axios from './axios';
import Cookies from 'js-cookie';

export const login = async (username, password) => {
    try {
        const response = await axios.post('/api/identity/token', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status
            throw new Error(error.response.data.messages);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
            throw new Error('Error setting up the request.');
        }
    }
}

export const refreshToken = async (token, refreshToken) => {
    const tokenAuth = Cookies.get('token');
    try {
        const response = await axios.post('/api/identity/token/refresh', {
            token: token,
            refreshToken: refreshToken
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAuth}`
            }
        });
        return response.data.data;
    }
    catch (error) {
        if (error.response) {
            // The request was made, but the server responded with a non-2xx status
            throw new Error(error.response.data.messages);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response received from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
            throw new Error('Error setting up the request.');
        }
    }
}


