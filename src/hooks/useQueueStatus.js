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
      setError("Queue durumu alınırken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();
    const interval = setInterval(fetchQueueStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return { queueStatus, loading, error, refetchQueueStatus: fetchQueueStatus };
};
