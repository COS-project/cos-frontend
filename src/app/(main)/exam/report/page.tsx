'use client';
import React from 'react';
import { useRecoilState } from 'recoil';

import ReportCard from '@/components/exam/ReportCard';
import StayTimeGraph from '@/components/exam/StayTimeGraph';
import SubjectGradeCard from '@/components/exam/SubjectGradeCard';
import { Session } from '@/types/global'; // Session 타입의 경로에 따라 수정
import { selectedSessionState } from '@/utils/recoilState';

const Report: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const subjects = selectedSession?.subjects;

  return (
    <div>
      <div className="bg-gray1 items-center">
        <div className="w-[85%] mx-auto">
          <div className="font-bold"> 과목별 맞춘 문제 수 </div>
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
              main={selectedSession?.totalCorrect + '점'}
              total={selectedSession?.totalProblem + '점'}
            />
            <ReportCard title="걸린시간" main="48:00" total="60:00(분)" />
          </div>
          <div>
            <StayTimeGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
