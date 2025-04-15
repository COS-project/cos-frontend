import { useEffect } from 'react';

import StickGraph from '@/components/exam/StickGraph';
import { SubjectResultsType } from '@/types/exam/type';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: SubjectResultsType[];
  averageSubjectList: AverageSubjectInfoType[];
  timeLimit: number;
  totalTakenTime: number;
}
const TakenTimeGraphReport = (props: Props) => {
  const { subjectResults, averageSubjectList, timeLimit, totalTakenTime } = props;

  const millisecondsToMinutes = (time: number | null) => {
    // 1분은 60000 밀리세컨드입니다.
    if (time !== null) {
      return Math.floor(time / 60000);
    }
  };

  const findLongestTakenTime = (data: AverageSubjectInfoType[] | SubjectResultsType[]) => {
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.reduce((maxTime, currentItem) => {
      return currentItem.totalTakenTime > maxTime ? currentItem.totalTakenTime : maxTime;
    }, 0);
  };

  if (!subjectResults) {
    return <div>Error</div>;
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

        <div className="flex items-end space-x-2">
          <div className="w-full">
            <div className="flex h-32">
              {subjectResults?.map((subjectResult, index) => {
                return (
                  <div key={index} className="w-full flex justify-center space-x-1">
                    <StickGraph
                      width={20}
                      height={millisecondsToMinutes(subjectResult.totalTakenTime)}
                      color="second"
                      maxNumber={millisecondsToMinutes(findLongestTakenTime(subjectResults))}
                    />
                    <StickGraph
                      width={20}
                      height={millisecondsToMinutes(averageSubjectList[index]?.totalTakenTime)}
                      color="gray2"
                      maxNumber={millisecondsToMinutes(findLongestTakenTime(averageSubjectList))}
                    />
                  </div>
                );
              })}
            </div>
            <div className="border-t border-gray1"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-full flex justify-between mt-[2%]">
            {subjectResults?.map((subjectResult, index) => (
              <div
                key={index}
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
export default TakenTimeGraphReport;
