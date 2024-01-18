import { useRecoilState } from 'recoil';

import { Session } from '@/types/global';
import { selectedSessionState } from '@/utils/recoilState';

import Example from './SimpleChart';

const CorrectRateGraph: React.FC = () => {
  const [selectedSession, setselectedSession] = useRecoilState<Session | null>(selectedSessionState);

  const subjects = selectedSession?.subjects;

  const radarChartData = subjects?.map((subject) => {
    return {
      subject: subject.name,
      A: (subject.correctAnswer / subject.totalProblems) * 100,
      B: (subject.correctAnswer / subject.totalProblems) * 50,
      // 다른 필요한 필드가 있다면 추가
    };
  });

  console.log(subjects);
  if (subjects) {
    console.log(radarChartData);
  }

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
