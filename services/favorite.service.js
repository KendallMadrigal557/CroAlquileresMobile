import axios from 'axios';
import API_URL from '../config/config';

class FavoriteService {
    static async createFavorite(favoriteData) {
        try {
            const response = await axios.post(`${API_URL}/favorite`, favoriteData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getFavorites() {
        try {
            const response = await axios.get(`${API_URL}/favorite`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    static async getFavoritesByUserId(userId) {
        try {
            const response = await axios.get(`${API_URL}/favorite?userId=${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    static async getFavoriteById(id) {
        try {
            const response = await axios.get(`${API_URL}/favorite/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteFavorite(id) {
        try {
            const response = await axios.delete(`${API_URL}/favorite/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default FavoriteService;
