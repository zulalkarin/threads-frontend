import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import ThreadControls from './ThreadControls';
import ThreadList from './ThreadList';
import QueueChart from './QueueChart';
import QueueVisualizer from './QueueVisualizer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard() {
  const [threads, setThreads] = useState([]);
  const [queueStatus, setQueueStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy threads için useEffect
  useEffect(() => {
    setThreads([
      { id: 1, type: 'Sender', status: 'RUNNING', priority: 5 },
      { id: 2, type: 'Receiver', status: 'RUNNING', priority: 5 },
      { id: 3, type: 'Sender', status: 'RUNNING', priority: 5 },
      { id: 4, type: 'Receiver', status: 'RUNNING', priority: 5 }
    ]);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [threadsData, queueData] = await Promise.all([
        api.getAllThreads(),
        api.getQueueStatus()
      ]);
      setThreads(threadsData);
      setQueueStatus(queueData);
      setError(null);
    } catch (err) {
      setError('Veri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Thread Yönetimi</h1>
        <button 
          className="refresh-button" 
          onClick={fetchData} 
          disabled={loading}
        >
          <FontAwesomeIcon icon={faSync} spin={loading} />
          Yenile
        </button>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <ThreadControls onThreadsStart={fetchData} />

      <div className="dashboard-grid">
        <div>
          <ThreadList 
            threads={threads} 
            onStatusChange={fetchData}
            onPriorityChange={fetchData}
          />
        </div>
        <QueueChart queueStatus={queueStatus} />
      </div>

      <QueueVisualizer queueStatus={queueStatus} />
    </div>
  );
}

export default Dashboard; 