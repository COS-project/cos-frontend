import React from 'react';

import Banner from '@/components/common/Banner';
import Header from '@/components/common/Header';
import SubjectSessionCard from '@/components/exam/SubjectList';
import YearSelector from '@/components/exam/YearSelector';

const Exam = () => {
  return (
    <div>
      <SolveExamBox />
    </div>
  );
};

const SolveExamBox = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="w-[95%] flex mx-auto space-x-1">
          <Banner title="지금까지 틀린 문제만 모아봤어요." buttonText="틀린 문제 풀기" href="/exam/wrong" />
          <Banner title="실제 출제된 문제를 모아봤어요" buttonText="랜덤 모의고사" href="/exam/wrong" />
        </div>
        <div className="w-[90%] mx-auto font-black text-h4 mt-5">모의고사 풀기</div>
        <YearSelector />
        <SubjectSessionCard />
      </div>
    </div>
  );
};

export default Exam;
