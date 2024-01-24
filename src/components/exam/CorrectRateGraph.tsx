import { useRecoilState } from 'recoil';

import { Round, Session } from '@/types/global';
import { selectedRoundState, selectedSessionState } from '@/utils/recoilState';

import Example from './SimpleChart';

// 정답률 그래프
const CorrectRateGraph: React.FC = () => {
  const [selectedSession, setselectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const [selectedRound, setSelectedRound] = useRecoilState<Round | null>(selectedRoundState);

  const subjects = selectedRound?.subjects;

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
