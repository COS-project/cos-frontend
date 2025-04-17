'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Banner from '@/components/common/Banner';
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import RandomMockExamModal from '@/components/exam/RandomMockExamModal';
import SkeletonSubjectSessionCard from '@/components/exam/skeleton/SkeletonSubjectSessionCard';
import SkeletonYearSelector from '@/components/exam/skeleton/SkeletonYearSelector';
import SubjectSessionCard from '@/components/exam/SubjectList';
import YearSelector from '@/components/exam/YearSelector';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import useDelayOver from '@/hooks/useDelayOver';
import useGetMockExamYears from '@/lib/hooks/useGetMockExamYears';
import { certificateIdAtom } from '@/recoil/atom';

const Exam = () => {
  return (
    <div>
      <Header />
      <SolveExamBox />
      <NavBar />
    </div>
  );
};

const SolveExamBox = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const { examYears, examYearsIsLoading } = useGetMockExamYears(certificateId);
  const [isClickedYearSelector, setIsClickedYearSelector] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isRandomMockExamModalOpen, setIsRandomMockExamModalOpen] = useState(false);
  const isDelayOver = useDelayOver(300, examYears);

  useEffect(() => {
    if (examYears && selectedYear === null) {
      setSelectedYear(examYears[0]);
    }
  }, [examYears, selectedYear]);

  return (
    <>
      {isRandomMockExamModalOpen ? (
        <RandomMockExamModal setIsRandomMockExamModalOpen={setIsRandomMockExamModalOpen} />
      ) : null}
      <Header headerType={'second'} />
      <div className="px-5 py-4">
        <div className="flex gap-x-4 justify-between">
          <Banner title="지금까지 틀린 문제만 모아봤어요." buttonText="틀린 문제 풀기" href="/exam/wrong" />
          <Banner
            title="실제 출제된 문제를 모아봤어요."
            buttonText="랜덤 모의고사"
            setIsRandomMockExamModalOpen={setIsRandomMockExamModalOpen}
          />
        </div>
        <div className="text-h3 mt-[24px] font-bold">모의고사 풀기</div>
        {!isDelayOver ? (
          <>
            <SkeletonYearSelector />
            <SkeletonSubjectSessionCard />
          </>
        ) : (
          <>
            <YearSelector
              isClickedYearSelector={isClickedYearSelector}
              examYears={examYears}
              setSelectedYear={setSelectedYear}
              setIsClickedYearSelector={setIsClickedYearSelector}
              selectedYear={selectedYear}
            />
            <SubjectSessionCard selectedYear={selectedYear} />
          </>
        )}
        <StopWatchActiveButton />
      </div>
    </>
  );
};

export default Exam;
