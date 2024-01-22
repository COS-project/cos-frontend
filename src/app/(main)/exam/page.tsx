'use client';
import React from 'react';

import SelectSubjectYearComboBox from '@/components/exam/SelectSubjectYearComboBox';
import WrongQuestionsSummaryBox from '@/components/exam/WrongAnswerSummaryCard';

const Exam = () => {
  return (
    <div>
      <WrongQuestionsSummaryBox />
      <SolveExamBox />
    </div>
  );
};

const SolveExamBox = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[85%] mx-auto font-black text-h4">모의고사 풀기</div>
        <SelectSubjectYearComboBox />
      </div>
    </div>
  );
};

export default Exam;
