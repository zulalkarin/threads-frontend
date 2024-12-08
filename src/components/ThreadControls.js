import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { api } from '../services/api';
import './ThreadControls.css';

function ThreadControls({ onThreadsStart }) {
  const [senderCount, setSenderCount] = useState(5);
  const [receiverCount, setReceiverCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartThreads = async () => {
    setIsLoading(true);
    try {
      await api.startThreads(senderCount, receiverCount);
      if (onThreadsStart) {
        onThreadsStart();
      }
    } catch (error) {
      console.error('Thread başlatma hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 20) {
      setter(value);
    }
  };

  return (
    <div className="controls-container">
      <div className="input-group">
        <label className="thread-label">Sender:</label>
        <input
          className="number-input"
          type="number"
          min="1"
          max="20"
          value={senderCount}
          onChange={handleInputChange(setSenderCount)}
        />
      </div>

      <div className="input-group">
        <label className="thread-label">Receiver:</label>
        <input
          className="number-input"
          type="number"
          min="1"
          max="20"
          value={receiverCount}
          onChange={handleInputChange(setReceiverCount)}
        />
      </div>

      <button 
        className="start-button"
        onClick={handleStartThreads} 
        disabled={isLoading || senderCount < 1 || receiverCount < 1}
      >
        <FontAwesomeIcon icon={faPlay} />
        {isLoading ? 'Başlatılıyor...' : 'Thread\'leri Başlat'}
      </button>
    </div>
  );
}

export default ThreadControls; 