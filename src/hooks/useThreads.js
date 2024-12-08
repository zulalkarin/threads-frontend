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
      setError('Thread verisi alınırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const startThreads = async (senderCount, receiverCount) => {
    setLoading(true);
    try {
      await api.startThreads(senderCount, receiverCount);
      await fetchThreads(); // Thread'ler başlatıldıktan sonra listeyi güncelle
      setError(null);
    } catch (err) {
      setError('Thread başlatma işlemi başarısız oldu');
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
    startThreads 
  };
}; 