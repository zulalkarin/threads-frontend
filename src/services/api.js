import axios from 'axios';
import BACKEND_URL from '../config';


export const api = {
  startThreads: async (senderCount, receiverCount) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/threads/start`, {
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
      const response = await axios.put(`${BACKEND_URL}/threads/${threadId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Thread durumu güncellenemedi');
    }
  },

  updateThreadPriority: async (threadId, priority) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/threads/${threadId}/priority`, { priority });
      return response.data;
    } catch (error) {
      throw new Error('Thread önceliği güncellenemedi');
    }
  },

  getAllThreads: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/threads`);
      return response.data;
    } catch (error) {
      throw new Error('Thread listesi alınamadı');
    }
  },

  getQueueStatus: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/queue/status`);
      return response.data;
    } catch (error) {
      throw new Error('Kuyruk durumu alınamadı');
    }
  }
}; 