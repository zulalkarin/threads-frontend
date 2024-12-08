import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  startThreads: async (senderCount, receiverCount) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/threads/start`, {
        senderCount,
        receiverCount
      });
      return response.data;
    } catch (error) {
      throw new Error('Thread başlatma işlemi başarısız oldu');
    }
  },

  updateThreadStatus: async (threadId, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/threads/${threadId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Thread durumu güncellenemedi');
    }
  },

  updateThreadPriority: async (threadId, priority) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/threads/${threadId}/priority`, { priority });
      return response.data;
    } catch (error) {
      throw new Error('Thread önceliği güncellenemedi');
    }
  },

  getAllThreads: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/threads`);
      return response.data;
    } catch (error) {
      throw new Error('Thread listesi alınamadı');
    }
  },

  getQueueStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/queue/status`);
      return response.data;
    } catch (error) {
      throw new Error('Kuyruk durumu alınamadı');
    }
  }
}; 