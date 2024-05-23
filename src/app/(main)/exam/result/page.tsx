'use client';
import { ResponsiveRadar } from '@nivo/radar';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import CorrectRateGraph from '@/components/exam/CorrectRateGraph';
import IncorrectQuestions from '@/components/exam/IncorrectQuestions';
import MockExamReportHeader from '@/components/exam/MockExamReportHeader';
import MockExamResultReport from '@/components/exam/MockExamResultReport';
import TakenTimeGraphReport from '@/components/exam/TakenTimeGraphReport';
import useGetTestResults from '@/lib/hooks/useGetTestResults';
import { mockExamIdState, submittedMockExamResultIdState } from '@/recoil/exam/atom';
import { subjectData } from '@/utils/common/accuracyChart';
import AccuracyChart from '@/lib/hooks/AccuracyChart';

const Result = () => {
  const [submittedMockExamResultId, setSubmittedMockExamResultId] = useRecoilState(submittedMockExamResultIdState);
  const [isClicked, setIsClicked] = useState<'시험결과' | '틀린문제'>('시험결과');
  const [mockExamId, setMockExamId] = useRecoilState(mockExamIdState);
  const { examResults } = useGetTestResults(mockExamId);
  let totalTakenTime = 0;
  const sumTotalTakenTime = () => {
    if (examResults) {
      examResults[examResults.length - 1]?.subjectResults.map((subjectResult)=>{
        totalTakenTime += subjectResult.totalTakenTime;
      });
      return totalTakenTime;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'성적리포트'}></Header>
      <MockExamReportHeader isClicked={isClicked} setIsClicked={setIsClicked} />
      <div className={'bg-gray0 min-h-screen p-5'}>
        {isClicked === '시험결과' ? (
          <div className={'flex flex-col gap-y-5'}>
            <MockExamResultReport
              timeLimit={examResults ? examResults[examResults.length - 1]?.mockExam.timeLimit : 0}
              totalTakenTime={sumTotalTakenTime}
              totalScore={100}
              score={examResults ? examResults[examResults.length - 1]?.totalScore : 0}
              subjectResults={examResults ? examResults[examResults.length - 1]?.subjectResults : []}
            />
            <TakenTimeGraphReport
              totalTakenTime={sumTotalTakenTime}
              subjectResults={examResults ? examResults[examResults.length - 1]?.subjectResults : []}
              timeLimit={examResults ? examResults[examResults.length - 1]?.mockExam.timeLimit : 0}
            />
            <AccuracyChart subjectResults={examResults ? examResults[examResults.length - 1]?.subjectResults : []} />
          </div>
        ) : (
          <div>
            <div>
              <IncorrectQuestions submittedMockExamResultId={submittedMockExamResultId} />
            </div>
          </div>
        )}
      </div>
      <NavBar />
    </>
  );
};

export default Result;
