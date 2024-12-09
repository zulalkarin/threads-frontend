import { useState } from "react";
import { api } from "../services/api";

export const useThreadControl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateThreadActive = async (threadId, active) => {
    setLoading(true);
    try {
      await api.updateThreadActive(threadId, active);
      setError(null);
    } catch (err) {
      setError("Thread durumu güncellenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const updateThreadPriority = async (threadId, priority) => {
    setLoading(true);
    try {
      await api.updateThreadPriority(threadId, priority);
      setError(null);
    } catch (err) {
      setError("Thread önceliği güncellenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateThreadActive,
    updateThreadPriority,
  };
};
