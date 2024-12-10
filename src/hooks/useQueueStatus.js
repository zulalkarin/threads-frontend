import { useState, useEffect } from "react";
import { api } from "../services/api";
import { websocketService } from "../services/websocket";

export const useQueueStatus = () => {
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueueStatus();
    
    const handleQueueUpdate = (updatedQueueStatus) => {
        setQueueStatus(updatedQueueStatus);
        setLoading(false);
    };

    websocketService.addQueueHandler(handleQueueUpdate);
    websocketService.connect();

    return () => {
        websocketService.removeQueueHandler(handleQueueUpdate);
    };
}, []);

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

  const clearQueue = async () => {
    try {
      await api.clearQueue();
    } catch (err) {
      setError("Error clearing queue");
    }
  };

  return {
    queueStatus,
    loading,
    error,
    clearQueue,
  };
};
