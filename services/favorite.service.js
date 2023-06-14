import axios from 'axios';

const API_URL = 'http://tu-servidor.com/api'; 

class FavoriteService {
    static async createFavorite(favoriteData) {
        try {
            const response = await axios.post(`${API_URL}/favorites`, favoriteData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getFavorites() {
        try {
            const response = await axios.get(`${API_URL}/favorites`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getFavoriteById(id) {
        try {
            const response = await axios.get(`${API_URL}/favorites/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteFavorite(id) {
        try {
            const response = await axios.delete(`${API_URL}/favorites/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default FavoriteService;
