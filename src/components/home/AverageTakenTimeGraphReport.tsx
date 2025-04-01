import { useEffect } from 'react';

import StickGraph from '@/components/exam/StickGraph';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: AverageSubjectInfoType[] | undefined;
  timeLimit: number | undefined;
  totalTakenTime: number;
}

const AverageTakenTimeGraphReport = (props: Props) => {
  const { subjectResults, timeLimit, totalTakenTime } = props;

  const millisecondsToMinutes = (time: number | null) => {
    // 1분은 60000 밀리세컨드입니다.
    if (time !== null) {
      return Math.floor(time / 60000);
    }
  };

  const findLongestTakenTime = (data: AverageSubjectInfoType[]) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.reduce((maxTime, currentItem) => {
      return currentItem.totalTakenTime > maxTime ? currentItem.totalTakenTime : maxTime;
    }, 0);
  };

  if (totalTakenTime === undefined || timeLimit === undefined || subjectResults === undefined) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={'flex flex-col gap-y-3 p-4 rounded-[32px] bg-white'}>
      <div className={'pl-1 text-h3 font-semibold'}>머문시간 그래프</div>
      <div>
        {/*걸린 시간*/}
        <div className={'pl-2'}>
          <div className={'text-h6'}>걸린시간</div>
          <div className={'text-h3 font-semibold'}>{millisecondsToMinutes(totalTakenTime)}m</div>
        </div>
        {/*막대 그래프*/}
        <div className="flex items-end space-x-2">
          <div className="w-full">
            <div className="flex h-32">
              {subjectResults.length > 0
                ? subjectResults.map((subjectResult, index) => {
                    return (
                      <div key={subjectResult.subject.subjectId} className="w-full flex justify-center space-x-2">
                        <StickGraph
                          height={millisecondsToMinutes(subjectResult.totalTakenTime)}
                          color="second"
                          maxNumber={millisecondsToMinutes(findLongestTakenTime(subjectResults))}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="border-t border-gray1"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-full flex justify-between mt-[2%]">
            {subjectResults?.map((subjectResult, index) => (
              <div
                key={subjectResult.subject.subjectId}
                className={
                  subjectResults.length > 3
                    ? 'w-full flex justify-center text-[10px]'
                    : 'w-full flex justify-center text-h7'
                }>
                {subjectResult.subject.subjectName}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AverageTakenTimeGraphReport;
