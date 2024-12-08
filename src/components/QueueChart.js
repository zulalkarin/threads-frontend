import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './QueueChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function QueueChart({ queueStatus }) {
  const [chartData, setChartData] = useState([]);
  
  // Son 10 veriyi tutacak şekilde güncelle
  useEffect(() => {
    setChartData(prevData => {
      const newData = [...prevData, queueStatus?.occupancyRate || 0];
      return newData.slice(-10); // Son 10 veriyi tut
    });
  }, [queueStatus]);

  const data = {
    labels: chartData.map((_, index) => `${index + 1}s`), // Son 10 saniye
    datasets: [
      {
        label: 'Doluluk Oranı (%)',
        data: chartData,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Queue Doluluk Oranı (Son 10 saniye)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Doluluk Oranı (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Zaman (saniye)'
        }
      }
    }
  };

  return (
    <div className="queue-chart-container">
      <Line data={data} options={options} />
      <div className="queue-stats">
        <div className="stat-item">
          <span className="stat-label">Mevcut Boyut:</span>
          <span className="stat-value">{queueStatus?.currentSize || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Maksimum Boyut:</span>
          <span className="stat-value">{queueStatus?.maxSize || 0}</span>
        </div>
      </div>
    </div>
  );
}

export default QueueChart; 