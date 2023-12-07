
import axios from './axios';
import Cookies from 'js-cookie';
import { filter } from 'lodash';

export const getAllCriminals = async (searchValue, filter) => {
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

        if (filter.yearOfBirth !== '' && !isNaN(filter.yearOfBirth)) {
            params.YearOfBirth = filter.yearOfBirth;
        }

        if (filter.gender !== '') {
            params.Gender = filter.gender;
        }

        if (filter.characteristic !== '') {
            params.Characteristics = filter.characteristic;
        }

        if (filter.charge !== '') {
            params.Charge = filter.charge;
        }

        if (filter.typeOfViolation !== '') {
            params.TypeOfViolation = filter.typeOfViolation;
        }
        const response = await axios.get(`/api/v1/criminal`, {
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

