import axios from 'axios';
import {API_BANK} from '../config/config';

class CreditCardService {
    static async createCreditCard(creditCardData) {
        try {
            const response = await axios.post(`${API_BANK}/credit-cards`, creditCardData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async getAllCreditCards() {
        try {
            const response = await axios.get(`${API_BANK}/credit-cards`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async getCreditCardById(id) {
        try {
            const response = await axios.get(`${API_BANK}/credit-cards/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async updateCreditCard(id, creditCardData) {
        try {
            const response = await axios.put(`${API_BANK}/credit-cards/${id}`, creditCardData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    static async deleteCreditCard(id) {
        try {
            const response = await axios.delete(`${API_BANK}/credit-cards/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
}

export default CreditCardService;
