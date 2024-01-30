'use client';
import React from 'react';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import WrongQuestionsSummaryBox from '@/components/exam/WrongAnswerSummaryCard';
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
      <div className="mt-8">
        <div className="w-[85%] mx-auto font-black text-h4">모의고사 풀기</div>
        <YearSelector />
      </div>
    </div>
  );
};

export default Exam;
