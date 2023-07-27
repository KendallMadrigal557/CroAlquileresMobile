import axios from 'axios';
import {API_URL} from '../config/config';

class DepartmentService {
    static async createDepartment(departmentData) {
        try {
            const response = await axios.post(`${API_URL}/department`, departmentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getDepartments() {
        try {
            const response = await axios.get(`${API_URL}/department`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getDepartmentById(id) {
        try {
            const response = await axios.get(`${API_URL}/department/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateDepartment(id, departmentData) {
        try {
            const response = await axios.put(`${API_URL}/department/${id}`, departmentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteDepartment(id) {
        try {
            const response = await axios.delete(`${API_URL}/department/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default DepartmentService;
