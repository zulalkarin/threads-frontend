import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useThreads } from '../hooks/useThreads';
import './ThreadControls.css';

function ThreadControls() {
  const [senderCount, setSenderCount] = useState(5);
  const [receiverCount, setReceiverCount] = useState(5);
  const { createThreads, loading, error, deleteThreads } = useThreads();

  const handleCreateThreads = async () => {
    await createThreads(senderCount, receiverCount);
  };

  const handleSenderChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setSenderCount(value);
  };

  const handleReceiverChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setReceiverCount(value);
  };

  const handleDeleteThreads = async () => {
    await deleteThreads();
  };

  return (
    <div className="controls-container">
      <div className="input-group">
        <label className="thread-label">Sender:</label>
        <input
          className="number-input"
          type="number"
          min="0"
          value={senderCount}
          onChange={handleSenderChange}
        />
      </div>

      <div className="input-group">
        <label className="thread-label">Receiver:</label>
        <input
          className="number-input"
          type="number"
          min="0"
          value={receiverCount}
          onChange={handleReceiverChange}
        />
      </div>

      <button 
        className="start-button"
        onClick={handleCreateThreads} 
        disabled={senderCount < 1 && receiverCount < 1}
      >
        <FontAwesomeIcon icon={faPlay} />
       Create Threads
      </button>
      
      <button className="stop-button" onClick={handleDeleteThreads}>Delete All</button>
      
    </div>
  );
}

export default ThreadControls; 