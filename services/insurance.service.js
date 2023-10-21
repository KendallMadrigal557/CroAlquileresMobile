import axios from 'axios';
import {API_INSURANCE} from '../config/config';

class InsuranceService {
    static async createInsurance(insuranceData) {
        try {
            const response = await axios.post(`${API_INSURANCE}/insurance`, insuranceData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async getAllInsurances() {
        try {
            const response = await axios.get(`${API_INSURANCE}/insurance`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async getInsuranceById(id) {
        try {
            const response = await axios.get(`${API_INSURANCE}/insurance/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async updateInsurance(id, insuranceData) {
        try {
            const response = await axios.put(`${API_INSURANCE}/insurance/${id}`, insuranceData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async deleteInsurance(id) {
        try {
            const response = await axios.delete(`${API_INSURANCE}/insurance/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}

export default InsuranceService;
