import React from 'react';

import Header from '@/components/common/Header';
import WrongQuestionsSummaryBox from '@/components/exam/IncorrectQuestionSummaryCard';
import SubjectSessionCard from '@/components/exam/SubjectList';
import YearSelector from '@/components/exam/YearSelector';

const Exam = () => {
  return (
    <div>
      <Header />
      <SolveExamBox />
    </div>
  );
};

const SolveExamBox = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="w-[95%] flex mx-auto space-x-1">
          <WrongQuestionsSummaryBox />
          <WrongQuestionsSummaryBox />
        </div>
        <div className="w-[90%] mx-auto font-black text-h4 mt-5">모의고사 풀기</div>
        <YearSelector />
        <SubjectSessionCard />
      </div>
    </div>
  );
};

export default Exam;
