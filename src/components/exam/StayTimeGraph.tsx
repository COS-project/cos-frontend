import { useRecoilState } from 'recoil';

import { Round, Session } from '@/types/global';
import { selectedRoundState, selectedSessionState } from '@/utils/recoilState';

import StickGraph from './StickGraph';

// examreportpage에서 머문시간 그래프를 나타내는 컴포넌트
const StayTimeGraph: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const [selectedRound, setSelectedRound] = useRecoilState<Round | null>(selectedRoundState);
  const subjects = selectedRound?.subjects;

  return (
    <div>
      <div className="bg-white rounded-xl p-3 my-4">
        <div className="font-bold text-h3">머문시간 그래프</div>
        <div className="text-h5 p-2">
          <div>걸린 시간</div>
          <div className="font-bold">{selectedRound?.totalTakenTime}m</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">{selectedRound?.totalAllowedTime}분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-32">
              {subjects?.map((subject, index) => (
                <div className="w-full flex justify-center space-x-2" key={index}>
                  {selectedSession?.isTaken == true ? (
                    // 시험을 본적이 있을때
                    <StickGraph height={subject.averageTime} color="gray2" />
                  ) : (
                    // 시험을 본적이 없을 경우
                    <div></div>
                  )}
                  <StickGraph height={subject.takenTime} color="blue" />
                </div>
              ))}
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between">
            {subjects?.map((subject, index) => (
              <div className="w-full flex justify-center text-h6" key={index}>
                {subject.name}
              </div>
            ))}
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};

export default StayTimeGraph;
