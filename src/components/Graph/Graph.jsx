
import React from 'react';
import style from './Graph.module.css'
import g from '../../assets/icons/LegendNode.svg';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const data = {
  labels: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد'],
  datasets: [
    {
      label: 'سال تحصیلی 1403-1404',
      data: [3, 1, 5, 1, 15, 1, 17, 5,20],
      borderColor: '#39A8AC',
      backgroundColor: 'rgba(57,168,172,0.3)',
      tension: 0.4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#69b0b2',
      pointRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        font: {
          family: 'bold',
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 5,
        font: {
          family: 'bold',
        },
      },
    },
    x: {
      ticks: {
        font: {
          family: 'bold',
        },
      },
    },
  },
};

export default function Graph() {
  return (
    <div className={style.main}>
        <div className={style.container} >
      <Line data={data} options={options} className={style.line} />
      <p className={style.p}>سال تحصیلی 1404-1405 <img src={g} alt='Legend Node'></img></p>
      <button className={style.button}
        onClick={() => window.print()}
        style={{
        
        }}  >
        پرینت نمودار غیبت 🖨️
      </button>
    </div>
    </div>
  );
}
