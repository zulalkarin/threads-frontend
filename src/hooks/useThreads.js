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
    createThreads 
  };
}; 