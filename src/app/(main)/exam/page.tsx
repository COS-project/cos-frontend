import React from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import SubjectSessionCard from '@/components/exam/SubjectList';
import WrongQuestionsSummaryBox from '@/components/exam/IncorrectQuestionSummaryCard';
import YearSelector from '@/components/exam/YearSelector';

const Exam = () => {
  return (
    <div>
      <Header />
      <WrongQuestionsSummaryBox />
      <SolveExamBox />
      <NavBar />
    </div>
  );
};

const SolveExamBox = () => {
  return (
    <div>
      <div className="mt-8 w-[90%] mx-auto">
        <div className="w-[95%] mx-auto font-black text-h4">모의고사 풀기</div>
        <YearSelector />
        <SubjectSessionCard />
      </div>
    </div>
  );
};

export default Exam;
