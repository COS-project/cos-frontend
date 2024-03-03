import React, { useEffect, useRef } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

interface DonutChartProps {
  data: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [
            {
              data: data,
              backgroundColor: ['gray', 'blue'], // 원하는 색상으로 변경
            },
          ],
        } as ChartData<'doughnut'>,
        options: {
          cutout: '75%', // 도넛 차트의 중앙을 빈 공간으로 만들기 위한 옵션
          responsive: true,
          plugins: {
            legend: {
              display: false, // 레이블 표시 여부를 설정
            },
          },
          elements: {
            arc: {
              borderRadius: 10, // 여기서 경계의 둥글기를 조절합니다.
            },
          },
        } as ChartOptions<'doughnut'>,
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
