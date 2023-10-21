import axios from 'axios';
import {API_URL} from '../config/config';

class UserService {
    static async createUser(userData) {
        try {
            const response = await axios.post(`${API_URL}/user`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getUsers() {
        try {
            const response = await axios.get(`${API_URL}/user`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getUserById(id) {
        try {
            const response = await axios.get(`${API_URL}/user/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateUser(id, userData) {
        try {
            const response = await axios.put(`${API_URL}/user/${id}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteUser(id) {
        try {
            const response = await axios.delete(`${API_URL}/user/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async enableTwoFactor(id, email) {
        try {
            const response = await axios.post(`${API_URL}/user/${id}/enable-two-factor`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async loginUser(email, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async sendUnlockAccountEmail(email, unlockCode) {
        try {
            const response = await axios.post(`${API_URL}/send-unlock-email`, { email, unlockCode });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    static async sendVerificationCode(email) {
        try {
            const response = await axios.post(`${API_URL}/send-verification-code`, { email });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    
    static async changePassword(email, password, verificationCode) {
        try {
            const response = await axios.post(`${API_URL}/change-password`, { email, password, verificationCode });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
    
}

export default UserService;
