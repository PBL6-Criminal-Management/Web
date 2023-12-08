
import axios from './axios';
import Cookies from 'js-cookie';

export const getAllCases = async (searchValue, filter) => {
    const token = Cookies.get('token');
    
    try {
        const params = {};
    
        if (searchValue !== '' && searchValue !== undefined) {
            params.Keyword = searchValue;
        }

        if (filter.status !== '') {
            params.Status = filter.status;
        }

        if (filter.area !== '') {
            params.Area = filter.area;
        }

        if (filter.timeTakesPlace !== '') {
            params.TimeTakesPlace = filter.timeTakesPlace;
        }

        if (filter.typeOfViolation !== '') {
            params.TypeOfViolation = filter.typeOfViolation;
        }
        const response = await axios.get(`/api/v1/case`, {
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

export const getCaseById = async (caseId) => {
    const token = Cookies.get('token');

    try {
        const response = await axios.get(`/api/v1/case/${caseId}`, {
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

