
import axios from './axios';

export async function login(username, password) {
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


