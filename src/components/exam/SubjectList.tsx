'use client';
import React from 'react';

import SubjectCard from '@/components/exam/SubjectCard';
import useGetMockExams from '@/lib/hooks/useGetMockExams';
import { ReviewIncorrectMockExam } from '@/types/global';

interface Props {
  selectedYear: number;
}
// 해당하는 연도의 회차별 데이터를 모두 출력
const SubjectSessionCard = (props: Props) => {
  const { selectedYear } = props;
  const { mockExams } = useGetMockExams(1, selectedYear);

  return (
    <div className={'mt-[16px] grid grid-cols-2 gap-x-4 gap-y-4'}>
      {mockExams?.map((mockExam: ReviewIncorrectMockExam, index: number) => {
        return (
          <div key={index}>
            <SubjectCard
              timeLimit={mockExam.timeLimit}
              total={300}
              round={mockExam.round}
              mockExamId={mockExam.MockExamId}></SubjectCard>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectSessionCard;
