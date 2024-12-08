import axios from 'axios';
import BACKEND_URL from '../config';


export const api = {  

  createThreads: async (senderCount, receiverCount) => {
    console.log('api createThreads: ', senderCount, receiverCount);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/threads/create`, 
        {},
        {
          params: {
            senderCount,
            receiverCount
          }
        }
      );
      
      console.log('api createThreads response', response.data);
      return response.data;
    } catch (error) {
      console.error('api createThreads error', error);
      throw new Error('Thread start process failed');
    }
  },

  updateThreadActive: async (threadId, active) => {
    console.log('api updateThreadActive: ', threadId, active);
    try {
      const response = await axios.put(`${BACKEND_URL}/threads/${threadId}/active?active=${active}`);
      console.log('api updateThreadActive response', response.data);
      return response.data;
    } catch (error) {
      throw new Error('Thread status update failed');
    }
  },

  updateThreadPriority: async (threadId, priority) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/threads/${threadId}/priority?priority=${priority}`);
      console.log('api updateThreadPriority response', response.data);
      return response.data;
    } catch (error) {
      throw new Error('Thread priority update failed');
    }
  },

  getAllThreads: async () => {
    console.log('api getAllThreads:********** ', `${BACKEND_URL}/threads`);
    try {
      const response = await axios.get(`${BACKEND_URL}/threads`);
      return response.data;
    } catch (error) {
      throw new Error('Thread list fetch failed');
    }
  },

  deleteThreads: async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/threads`);
      return response.data;
    } catch (error) {
      throw new Error('Thread delete failed');
    }
  },

  getQueueStatus: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/queue/status`);
      console.log('api getQueueStatus response', response.data);
      return response.data;
    } catch (error) {
      throw new Error('Queue status fetch failed');
    }
  },


}; 