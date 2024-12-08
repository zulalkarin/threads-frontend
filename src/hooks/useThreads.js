import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const data = await api.getAllThreads();
      setThreads(data);
      console.log('fetchThreads data', data);
      setError(null);
    } catch (err) {
      setError('Error fetching thread data');
    } finally {
      setLoading(false);
    }
  };

  const createThreads = async (senderCount, receiverCount) => {
    console.log('createThreads', senderCount, receiverCount);
    setLoading(true);
    try {
      await api.createThreads(senderCount, receiverCount);
      await fetchThreads(); // update thread list after starting
      setError(null);
    } catch (err) {
      setError('Thread start process failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteThreads = async () => {
    setLoading(true);
    try {
      await api.deleteThreads();
      await fetchThreads();
    } catch (err) {
      setError('Thread delete process failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 1000);
    return () => clearInterval(interval);
  }, []);

  return { 
    threads, 
    loading, 
    error, 
    refetchThreads: fetchThreads,
    createThreads,
    deleteThreads
  };
}; 