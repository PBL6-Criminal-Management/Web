import axios from 'axios';

export default axios.create({
    baseURL: 'https://criminalmanagementapi.azurewebsites.net'
});