import React, { useState } from 'react';
import ThreadControls from './ThreadControls';
import ThreadList from './ThreadList';
import QueueChart from './QueueChart';
import QueueVisualizer from './QueueVisualizer';
import { useThreads } from '../hooks/useThreads';
import { useQueueStatus } from '../hooks/useQueueStatus';
import './Dashboard.css';

function Dashboard() {
  const { 
    threads,
    loading: threadsLoading, 
    error: threadsError,
    refetchThreads 
  } = useThreads();

//   console.log('threads', threads);


const [ activeSenderThreads, setActiveSenderThreads ] = useState([]);
const [ activeReceiverThreads, setActiveReceiverThreads ] = useState([]);

  const { 
    queueStatus, 
    loading: queueLoading, 
    error: queueError 
  } = useQueueStatus();

//   //find the active threads
//   setActiveSenderThreads(threads.filter(thread => thread.type === 'Sender' && thread.active === true));
//   setActiveReceiverThreads(threads.filter(thread => thread.type === 'Receiver' && thread.active === true));


//   console.log("");
//   console.log("");
//   console.log("");
//   console.log("");
  
//   console.log('activeSenderThreads', activeSenderThreads);
//   console.log('activeReceiverThreads', activeReceiverThreads);
//   console.log("");
  
//   console.log("");
//   console.log("");
  

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
        <QueueChart queueStatus={queueStatus} threads={threads}/>
      </div>

      <QueueVisualizer queueStatus={queueStatus} threads={threads}/>
    </div>
  );
}

export default Dashboard; 