import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useQueueStatus = () => {
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQueueStatus = async () => {
    setLoading(true);
    try {
      const data = await api.getQueueStatus();
      setQueueStatus(data);
      setError(null);
    } catch (err) {
      setError("Error fetching queue status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const clearQueue = async () => {
    try {
      await api.clearQueue();
      fetchQueueStatus();
    } catch (err) {
      setError("Error clearing queue");
    }
  };

  return {
    queueStatus,
    loading,
    error,
    refetchQueueStatus: fetchQueueStatus,
    clearQueue,
  };
};
