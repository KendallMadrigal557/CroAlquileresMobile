import axios from 'axios';
import {API_MUNI} from '../config/config';

class PlaceService {
    static async createPlace(placeData) {
        try {
            const response = await axios.post(`${API_MUNI}/place`, placeData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getPlaces() {
        try {
            const response = await axios.get(`${API_MUNI}/place`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getPlaceById(id) {
        try {
            const response = await axios.get(`${API_MUNI}/place/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updatePlace(id, placeData) {
        try {
            const response = await axios.put(`${API_MUNI}/place/${id}`, placeData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deletePlace(id) {
        try {
            const response = await axios.delete(`${API_MUNI}/place/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default PlaceService;
