import axios from 'axios';
import API_URL from '../config/config';

class AuditLogService {
    static async createAuditLog(auditLogData) {
        try {
            const response = await axios.post(`${API_URL}/audit-log`, auditLogData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getAuditLogs() {
        try {
            const response = await axios.get(`${API_URL}/audit-log`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async getAuditLogById(id) {
        try {
            const response = await axios.get(`${API_URL}/audit-log/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async updateAuditLog(id, auditLogData) {
        try {
            const response = await axios.put(`${API_URL}/audit-log/${id}`, auditLogData);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    static async deleteAuditLog(id) {
        try {
            const response = await axios.delete(`${API_URL}/audit-log/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

export default AuditLogService;
