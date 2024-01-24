'use client';
import React from 'react';
import { useRecoilState } from 'recoil';

import CorrectRateGraph from '@/components/exam/CorrectRateGraph';
import ReportCard from '@/components/exam/ReportCard';
import RoundFilter from '@/components/exam/RoundFilter';
import StayTimeGraph from '@/components/exam/StayTimeGraph';
import SubjectGradeCard from '@/components/exam/SubjectGradeCard';
import { Round, Session } from '@/types/global';
import { selectedRoundState, selectedSessionState } from '@/utils/recoilState';

const Report: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const [selectedRound, setSelectedRound] = useRecoilState<Round | null>(selectedRoundState);
  const subjects = selectedRound?.subjects;

  return (
    <div>
      <div className="bg-gray0 items-center h-screen">
        <div className="w-[85%] mx-auto my-4">
          <div className="my-2">
            <div className="font-bold text-h3">모의고사 응시횟수 선택</div>
            <RoundFilter />
          </div>
          <div className="font-bold text-h3"> 과목별 맞춘 문제 수 </div>
          <div className="flex bg-white my-2">
            {subjects?.map((subject, index) => (
              <SubjectGradeCard
                key={index}
                name={subject.name}
                correctAnswer={subject.correctAnswer}
                totalCorrect={subject.totalProblems}
              />
            ))}
          </div>
          <div className="flex space-x-2 my-4">
            <ReportCard
              title="최근 점수"
              main={selectedRound?.totalCorrect + '점'}
              total={selectedRound?.totalProblem + '점'}
            />
            <ReportCard title="걸린시간" main="48:00" total="60:00(분)" />
          </div>
          <div>
            <StayTimeGraph />
            <CorrectRateGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
