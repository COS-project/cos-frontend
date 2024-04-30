'use client';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useGetExamYearData } from '@/lib/hooks/useGetExamInfoFetcher';
import { roundsArrayState, YearState } from '@/utils/recoilState';

import SubjectCard from './SubjectCard';

// 해당하는 연도의 회차별 데이터를 모두 출력
const SubjectSessionCard: React.FC = ({}) => {
  // 연도 데이터 불러오기
  const [selectedYear] = useRecoilState<Number | undefined>(YearState);
  const [roundArrays, setRoundArrays] = useRecoilState<number[] | undefined>(roundsArrayState);

  // ExamID, round, istake 정보 실려옴
  const { YearData } = useGetExamYearData(1, selectedYear);

  // api 살아나면 살릴부분
  // const rounds = YearData?.result;

  const rounds = [
    { round: 1, mockExamId: 23, isTake: true },
    { round: 2, mockExamId: 56, isTake: false },
    { round: 3, mockExamId: 89, isTake: true },
  ];

  // api 살아나면 이부분 살려야함
  // useEffect(() => {
  //   if (rounds) {
  //     const roundArray = rounds.map((item) => item.round);
  //     setRoundArrays(roundArray);
  //   }
  // }, [rounds, setRoundArrays]);

  if (!rounds) {
    return (
      <div>
        {/* 이 부분 모듈로 뺍니다*/}
        데이터 불러오는 중
      </div>
    );
  }

  // 여기서 selectedSession 에 대한 전역 상태가 결정됩니다.
  return (
    <>
      <div className="flex flex-wrap mt-5">
        {rounds?.map((round, index) => {
          if (round.round) {
            return (
              <div key={index} className="w-1/2 mb-4">
                <SubjectCard round={round.round} score={round.mockExamId} total={50} isTaken={round.isTake} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default SubjectSessionCard;
