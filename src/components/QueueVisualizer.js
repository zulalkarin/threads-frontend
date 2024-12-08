import React from 'react';
import './QueueVisualizer.css';

function QueueVisualizer({ queueStatus }) {
  const {
    size = 0,
    capacity = 100,
    items = []
  } = queueStatus || {};

  const isFull = size >= capacity;
  //add 4 dummy items
  items.push({ id: 3, type: 'Sender', timestamp: '10:02' });
  items.push({ id: 4, type: 'Receiver', timestamp: '10:03' });
  items.push({ id: 5, type: 'Sender', timestamp: '10:04' });
  items.push({ id: 6, type: 'Receiver', timestamp: '10:05' });

  return (
    <div className="queue-container">
      <div className="queue-info">
        <div className="legend">
          <div className="legend-item">
            <div className="legend-box sender" />
            <span>Sender</span>
          </div>
          <div className="legend-item">
            <div className="legend-box receiver" />
            <span>Receiver</span>
          </div>
        </div>
        <div className={`queue-status ${isFull ? 'full' : 'normal'}`}>
          {size}/{capacity} items
        </div>
      </div>

      <div className="queue-display">
        {items.length === 0 ? (
          <div className="empty-message">Queue boş</div>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`thread-box ${item.type.toLowerCase()}`}
            >
              <div>{item.type}</div>
              <div>#{item.id}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QueueVisualizer; 