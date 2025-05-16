import { useState, useEffect } from 'react';
import './PriceChart.css';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart({ symbol, exchange }) {
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol && exchange) {
      fetchChartData();
    }
  }, [symbol, exchange, timeRange]);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      // Здесь должна быть реальная загрузка данных
      // Для демо используем фейковые данные
      const fakeData = generateFakeChartData();
      setChartData(fakeData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateFakeChartData = () => {
    const labels = [];
    const data = [];
    const now = new Date();
    let days = 7;
    
    if (timeRange === '1m') days = 30;
    if (timeRange === '3m') days = 90;
    if (timeRange === '1y') days = 365;

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      labels.push(date.toLocaleDateString());
      data.push(150 + Math.sin(i) * 20 + Math.random() * 10);
    }

    return {
      labels,
      datasets: [
        {
          label: `Цена ${symbol}`,
          data,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  return (
    <div className="price-chart">
      <div className="chart-header">
        <h3>История цены: {symbol}</h3>
        <div className="time-range-selector">
          <button 
            className={timeRange === '7d' ? 'active' : ''} 
            onClick={() => setTimeRange('7d')}
          >
            7 дней
          </button>
          <button 
            className={timeRange === '1m' ? 'active' : ''} 
            onClick={() => setTimeRange('1m')}
          >
            1 месяц
          </button>
          <button 
            className={timeRange === '3m' ? 'active' : ''} 
            onClick={() => setTimeRange('3m')}
          >
            3 месяца
          </button>
          <button 
            className={timeRange === '1y' ? 'active' : ''} 
            onClick={() => setTimeRange('1y')}
          >
            1 год
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="chart-loading">Загрузка графика...</div>
      ) : chartData ? (
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }} />
      ) : (
        <div className="chart-placeholder">Выберите акцию для отображения графика</div>
      )}
    </div>
  );
}

export default PriceChart;