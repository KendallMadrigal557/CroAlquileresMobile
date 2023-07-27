import axios from 'axios';
import API_BANK from '../config/config';

class PaymentService {
    static async createPayment(paymentData) {
        try {
            const response = await axios.post(`${API_BANK}/payments`, paymentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getAllPayments() {
        try {
            const response = await axios.get(`${API_BANK}/payments`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getPaymentById(id) {
        try {
            const response = await axios.get(`${API_BANK}/payments/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updatePayment(id, paymentData) {
        try {
            const response = await axios.put(`${API_BANK}/payments/${id}`, paymentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deletePayment(id) {
        try {
            const response = await axios.delete(`${API_BANK}/payments/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default PaymentService;
