'use client';
import React from 'react';
import { useRecoilState } from 'recoil';

import CorrectRateGraph from '@/components/exam/CorrectRateGraph';
import ReportCard from '@/components/exam/ReportCard';
import RoundFilter from '@/components/exam/RoundFilter';
import StayTimeGraph from '@/components/exam/StayTimeGraph';
import SubjectGradeCard from '@/components/exam/SubjectGradeCard';
import { selectedRoundState } from '@/utils/recoilState';

const Report: React.FC = () => {
  const [selectedRound, setSelectedRound] = useRecoilState<Number | null>(selectedRoundState);

  const subjects = [
    { name: '컴퓨터 일반', correctAnswer: 75, totalProblems: 100 },
    { name: '스프레드시트', correctAnswer: 60, totalProblems: 80 },
    { name: '데이터베이스', correctAnswer: 30, totalProblems: 60 },

    // ... 다른 과목들
  ];

  return (
    <div>
      <div className="bg-gray0 items-center h-screen overflow-y-auto">
        <div className="w-[85%] mx-auto my-4">
          <div className="my-2">
            <div className="font-bold text-h3">모의고사 응시횟수 선택</div>
            <RoundFilter />
          </div>
          <div className="font-bold text-h3"> 과목별 맞춘 문제 수 </div>
          <div className="flex bg-white my-2">
            <SubjectGradeCard name={'데이터베이스'} correctAnswer={5} totalCorrect={10} />
            <SubjectGradeCard name={'과학'} correctAnswer={5} totalCorrect={10} />
            <SubjectGradeCard name={'과학'} correctAnswer={5} totalCorrect={10} />
          </div>
          <div className="flex space-x-2 my-4">
            <ReportCard title="최근 점수" main={50 + '점'} total={100 + '점'} />
            <ReportCard title="걸린시간" main="48:00" total="60:00(분)" />
          </div>
          <div>
            <div className="mx-auto mt-2 rounded-3xl bg-white py-[6%]">
              <div className="w-[90%] mx-auto">
                <StayTimeGraph
                  title="머문시간"
                  takenTime={70}
                  maxTime={100}
                  subjectTime={[50, 60, 70]}
                  subjectName={['이산수학', '자료구조', '운영체제']}
                />
              </div>
            </div>
            <div className="mx-auto mt-2 rounded-3xl bg-white py-[6%]">
              <div className="w-[90%] mx-auto">
                <CorrectRateGraph subjects={subjects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
