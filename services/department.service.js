import axios from 'axios';
import API_URL from '../config/config';

class DepartmentService {
    static async createDepartment(departmentData) {
        try {
            const response = await axios.post(`${API_URL}/departments`, departmentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getDepartments() {
        try {
            const response = await axios.get(`${API_URL}/departments`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getDepartmentById(id) {
        try {
            const response = await axios.get(`${API_URL}/departments/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateDepartment(id, departmentData) {
        try {
            const response = await axios.put(`${API_URL}/departments/${id}`, departmentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteDepartment(id) {
        try {
            const response = await axios.delete(`${API_URL}/departments/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default DepartmentService;
