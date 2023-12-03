import axios from 'axios';

export default axios.create({
    baseURL: 'https://criminalmanagement.azurewebsites.net'
});