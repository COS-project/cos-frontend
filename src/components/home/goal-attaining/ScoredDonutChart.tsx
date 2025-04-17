import DonutChart from './donutchart';

interface DonutChartProps {
  maxScore: number | undefined;
  goalScore: number;

  unit: string;
}

const ScoredDonutChart: React.FC<DonutChartProps> = ({ maxScore, goalScore, unit }) => {
  const chartData =
    typeof maxScore === 'number'
      ? goalScore - maxScore <= 0
        ? [0, 1] // 파랑 100%
        : [goalScore - maxScore, maxScore] // 회색 + 파랑
      : [1, 0]; // undefined일 경우 대비 (회색 100%)

  return (
    <div>
      <DonutChart data={chartData} />
      {/* 가운데에 위치할 텍스트 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-semibold text-h3">
          {maxScore}
          {unit}
        </p>
        <p className="text-h6 text-gray4">
          /{goalScore}
          {unit}
        </p>
      </div>
    </div>
  );
};

export default ScoredDonutChart;
