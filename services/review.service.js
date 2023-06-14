import axios from 'axios';

const API_URL = 'http://tu-servidor.com/api'; // Reemplaza con la URL de tu servidor

class ReviewService {
    static async createReview(reviewData) {
        try {
            const response = await axios.post(`${API_URL}/reviews`, reviewData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getReviews() {
        try {
            const response = await axios.get(`${API_URL}/reviews`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getReviewById(id) {
        try {
            const response = await axios.get(`${API_URL}/reviews/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateReview(id, reviewData) {
        try {
            const response = await axios.put(`${API_URL}/reviews/${id}`, reviewData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteReview(id) {
        try {
            const response = await axios.delete(`${API_URL}/reviews/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default ReviewService;
