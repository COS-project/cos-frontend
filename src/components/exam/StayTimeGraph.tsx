import { useRecoilState } from 'recoil';

import { Session } from '@/types/global';
import { selectedSessionState } from '@/utils/recoilState';
// examreportpage에서 머문시간 그래프를 나타내는 컴포넌트

interface StickGraphProps {
  height: number;
}

const StayTimeGraph: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const subjects = selectedSession?.subjects;

  return (
    <div>
      <div className="bg-white rounded-xl p-3">
        <div className="font-bold text-h3">머문시간 그래프</div>
        <div className="text-h5 p-2">
          <div>걸린 시간</div>
          <div className="font-bold">48m</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[85%] border-t border-gray1"></div>
          <div className="w-[15%] text-gray3 text-h5">90분</div>
        </div>
        <div className="flex items-end space-x-2">
          <div className="w-[85%]">
            <div className="flex h-20">
              <div className="w-full flex justify-center">
                <StickGraph height={10} />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={10} />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={10} />
              </div>
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0분</div>
        </div>
        <div className="flex space-x-2">
          <div className="w-[85%] flex justify-between">
            {subjects?.map((subject, index) => (
              <div className="w-full flex justify-center text-h5" key={index}>
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

const StickGraph: React.FC<StickGraphProps> = ({ height }) => {
  return <div className={'w-[20%] h-1/2 bg-blue rounded-t-full'}></div>;
};
