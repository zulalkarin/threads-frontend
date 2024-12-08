import { useState } from 'react';
import { api } from '../services/api';

export const useThreadControl = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateThreadStatus = async (threadId, status) => {
    setLoading(true);
    try {
      await api.updateThreadStatus(threadId, status);
      if (onSuccess) onSuccess();
      setError(null);
    } catch (err) {
      setError('Thread durumu güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const updateThreadPriority = async (threadId, priority) => {
    setLoading(true);
    try {
      await api.updateThreadPriority(threadId, priority);
      if (onSuccess) onSuccess();
      setError(null);
    } catch (err) {
      setError('Thread önceliği güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateThreadStatus,
    updateThreadPriority
  };
}; 