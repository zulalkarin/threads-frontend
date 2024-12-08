import React from 'react';
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
  const data = {
    labels: queueStatus?.items.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: 'Queue Doluluk Oranı',
        data: queueStatus?.items.map((_, index) => 
          (index / queueStatus.capacity) * 100
        ),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
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
        text: 'Queue Durumu'
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
      }
    }
  };

  return (
    <div className="queue-chart-container">
      <Line data={data} options={options} />
    </div>
  );
}

export default QueueChart; 