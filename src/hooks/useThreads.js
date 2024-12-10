import { useState, useEffect } from "react";
import { api } from "../services/api";
import { websocketService } from "../services/websocket";

export const useThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchThreads();
    
    const handleThreadUpdate = (updatedThreads) => {
        setThreads(updatedThreads);
        setLoading(false);
    };

    websocketService.addThreadHandler(handleThreadUpdate);
    websocketService.connect();

    return () => {
        websocketService.removeThreadHandler(handleThreadUpdate);
    };
}, []);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const data = await api.getAllThreads();
      setThreads(data);
      setError(null);
    } catch (err) {
      setError("Error fetching thread data");
    } finally {
      setLoading(false);
    }
  };

  const createThreads = async (senderCount, receiverCount) => {
    setLoading(true);
    try {
      await api.createThreads(senderCount, receiverCount);
      setError(null);
    } catch (err) {
      setError("Thread start process failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteThreads = async () => {
    setLoading(true);
    try {
      await api.deleteThreads();
    } catch (err) {
      setError("Thread delete process failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    threads,
    loading,
    error,
    createThreads,
    deleteThreads,
  };
};
