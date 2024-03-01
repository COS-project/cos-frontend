import Example from './SimpleChart';

// 정답률 그래프
const CorrectRateGraph: React.FC = () => {
  const subjects = [
    { name: 'Math', correctAnswer: 75, totalProblems: 100 },
    { name: 'Science', correctAnswer: 60, totalProblems: 80 },
    { name: 'History', correctAnswer: 40, totalProblems: 60 },
    // ... 다른 과목들
  ];

  const radarChartData = subjects?.map((subject) => {
    return {
      subject: subject.name,
      A: (subject.correctAnswer / subject.totalProblems) * 100,
      B: (subject.correctAnswer / subject.totalProblems) * 50,
      // 다른 필요한 필드가 있다면 추가
    };
  });

  return (
    <div>
      <div className="bg-white rounded-xl p-3 my-4 h-30">
        <div className="font-bold text-h3">과목별 정답률</div>
        <div className="h-60">
          <Example data={radarChartData} />
        </div>
      </div>
    </div>
  );
};

export default CorrectRateGraph;
