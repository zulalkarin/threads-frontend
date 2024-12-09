import React, { useState } from "react";
import ThreadControls from "./ThreadControls";
import ThreadList from "./ThreadList";
import QueueChart from "./QueueChart";
import QueueVisualizer from "./QueueVisualizer";
import { useThreads } from "../hooks/useThreads";
import { useQueueStatus } from "../hooks/useQueueStatus";
import "./Dashboard.css";

function Dashboard() {
  let {
    threads,
    loading: threadsLoading,
    error: threadsError,
    refetchThreads,
  } = useThreads();

  //   console.log('threads', threads);

  const [activeSenderThreads, setActiveSenderThreads] = useState([]);
  const [activeReceiverThreads, setActiveReceiverThreads] = useState([]);

  const {
    queueStatus,
    loading: queueLoading,
    error: queueError,
  } = useQueueStatus();

  const loading = threadsLoading || queueLoading;
  const error = threadsError || queueError;

  return (
    <div className="dashboard-container">
      {error && <div className="error-message">{error}</div>}

      <ThreadControls onThreadsStart={refetchThreads} />

      {threads.length > 0 && (
        <div className="dashboard-grid">
          <ThreadList
            threads={threads}
            onStatusChange={refetchThreads}
            onPriorityChange={refetchThreads}
            loading={loading}
          />
        </div>
      )}
      <QueueChart queueStatus={queueStatus} threads={threads} />

      {/* <QueueVisualizer queueStatus={queueStatus} threads={threads}/> */}
    </div>
  );
}

export default Dashboard;
