import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { api } from '../services/api';
import './ThreadList.css';

function ThreadList({ threads, onStatusChange, onPriorityChange }) {
  const handleStatusChange = async (threadId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'RUNNING' ? 'STOPPED' : 'RUNNING';
      await api.updateThreadStatus(threadId, newStatus);
      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error('Error handling status change:', error);
    }
  };

  const handlePriorityChange = async (threadId, currentPriority, direction) => {
    try {
      const newPriority = direction === 'up' ? currentPriority + 1 : currentPriority - 1;
      if (newPriority >= 1 && newPriority <= 10) {
        await api.updateThreadPriority(threadId, newPriority);
        if (onPriorityChange) {
          onPriorityChange();
        }
      }
    } catch (error) {
      console.error('Error handling priority change:', error);
    }
  };

  return (
    <div className="thread-table">
      <table>
        <thead>
          <tr>
            <th>Thread ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {threads.map(thread => (
            <tr key={thread.id}>
              <td>{thread.id}</td>
              <td>{thread.type}</td>
              <td>{thread.status}</td>
              <td>
                <button
                  className="priority-button"
                  onClick={() => handlePriorityChange(thread.id, thread.priority, 'down')}
                  disabled={thread.priority <= 1}
                >
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <span className="priority-display">{thread.priority}</span>
                <button
                  className="priority-button"
                  onClick={() => handlePriorityChange(thread.id, thread.priority, 'up')}
                  disabled={thread.priority >= 10}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
              </td>
              <td>
                <button
                  className={`action-button ${thread.status === 'RUNNING' ? 'running' : 'stopped'}`}
                  onClick={() => handleStatusChange(thread.id, thread.status)}
                >
                  <FontAwesomeIcon icon={thread.status === 'RUNNING' ? faStop : faPlay} />
                  {thread.status === 'RUNNING' ? ' Durdur' : ' Başlat'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThreadList; 