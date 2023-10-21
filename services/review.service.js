import axios from 'axios';
import {API_URL} from '../config/config';

class ReviewService {
    static async createReview(reviewData) {
        try {
            const response = await axios.post(`${API_URL}/review`, reviewData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getReviews() {
        try {
            const response = await axios.get(`${API_URL}/review`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getReviewById(id) {
        try {
            const response = await axios.get(`${API_URL}/review/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateReview(id, reviewData) {
        try {
            const response = await axios.put(`${API_URL}/review/${id}`, reviewData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteReview(id) {
        try {
            const response = await axios.delete(`${API_URL}/review/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    static async getReviewsByDepartment(departmentId) {
        try {
            const response = await axios.get(`${API_URL}/review?departmentId=${departmentId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default ReviewService;
