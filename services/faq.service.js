import axios from 'axios';
import API_URL from '../config/config';

class FAQService {
    static async createFAQ(faqData) {
        try {
            const response = await axios.post(`${API_URL}/faq`, faqData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getFAQs() {
        try {
            const response = await axios.get(`${API_URL}/faq`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getFAQById(id) {
        try {
            const response = await axios.get(`${API_URL}/faq/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateFAQ(id, faqData) {
        try {
            const response = await axios.put(`${API_URL}/faq/${id}`, faqData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteFAQ(id) {
        try {
            const response = await axios.delete(`${API_URL}/faq/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default FAQService;
