import React from 'react';
import ThreadControls from './ThreadControls';
import ThreadList from './ThreadList';
import QueueChart from './QueueChart';
import QueueVisualizer from './QueueVisualizer';
import { useThreads } from '../hooks/useThreads';
import { useQueueStatus } from '../hooks/useQueueStatus';
import './Dashboard.css';

function Dashboard() {
  let { 
    threads, 
    loading: threadsLoading, 
    error: threadsError,
    refetchThreads 
  } = useThreads();

  //create dummy threads
   threads = [
    { id: 1, type: 'Sender', status: 'RUNNING', priority: 5 },
    { id: 2, type: 'Receiver', status: 'RUNNING', priority: 5 }
  ];

  const { 
    queueStatus, 
    loading: queueLoading, 
    error: queueError 
  } = useQueueStatus();

  const loading = threadsLoading || queueLoading;
  const error = threadsError || queueError;

  return (
    <div className="dashboard-container">
      {error && <div className="error-message">{error}</div>}
      
      <ThreadControls onThreadsStart={refetchThreads} />
      
      <div className="dashboard-grid">
        <ThreadList 
          threads={threads} 
          onStatusChange={refetchThreads}
          onPriorityChange={refetchThreads}
          loading={loading}
        />
        <QueueChart queueStatus={queueStatus} />
      </div>

      <QueueVisualizer queueStatus={queueStatus} />
    </div>
  );
}

export default Dashboard; 