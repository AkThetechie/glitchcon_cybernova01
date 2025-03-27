import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUserData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};
