'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import AccuracyChart from '@/components/exam/AccuracyChart';
import IncorrectQuestions from '@/components/exam/IncorrectQuestions';
import MockExamReportHeader from '@/components/exam/MockExamReportHeader';
import MockExamResultReport from '@/components/exam/MockExamResultReport';
import TakenTimeGraphReport from '@/components/exam/TakenTimeGraphReport';
import UserExamAttemptsFilterContent from '@/components/exam/UserExamAttemptsFilterContent';
import useAverageSubjectInfo from '@/lib/hooks/useAverageSubjectInfo';
import useGetTestResults from '@/lib/hooks/useGetTestResults';
import { mockExamIdState, submittedMockExamResultIdState } from '@/recoil/exam/atom';
import { MockExamResultType } from '@/types/exam/type';
import { certificateIdAtom } from '@/recoil/atom';

const Result = () => {
  const certificateId = useRecoilValue(certificateIdAtom);
  const [submittedMockExamResultId, setSubmittedMockExamResultId] = useRecoilState(submittedMockExamResultIdState);
  const [isClicked, setIsClicked] = useState<'시험결과' | '틀린문제'>('시험결과');
  const [mockExamId, setMockExamId] = useRecoilState(mockExamIdState);
  const { examResults } = useGetTestResults(mockExamId);
  const [userExamAttempt, setUserExamAttempt] = useState<number>(1);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  let totalTakenTime = 0;
  const router = useRouter();
  const { averageSubjectList } = useAverageSubjectInfo(certificateId);

  const onBack = () => {
    router.push('/exam');
  };

  useEffect(() => {
    if (examResults && examResults.length > 0 && isInitialLoad) {
      setUserExamAttempt(examResults.length);
      setIsInitialLoad(false); // 초기화 완료 후 상태 업데이트
    }
  }, [examResults, isInitialLoad]);

  const sumTotalTakenTime = () => {
    if (examResults) {
      examResults[examResults.length - 1]?.subjectResults.map((subjectResult) => {
        totalTakenTime += subjectResult.totalTakenTime;
      });
      return totalTakenTime;
    } else {
      return 0;
    }
  };

  /**
   * ExamResults 리스트의 값이 1개 이상일 경우 필터 적용 1개일 경우는 적용 X
   * @param examResults 시험 결과
   */
  const displayComponentBasedOnExamResults = (examResults: MockExamResultType[] | null | undefined) => {
    if (examResults && examResults.length === 1) {
      return (
        <>
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
                averageSubjectList={averageSubjectList ? averageSubjectList : []}
                timeLimit={examResults ? examResults[examResults.length - 1]?.mockExam.timeLimit : 0}
              />
              <AccuracyChart
                subjectResults={examResults ? examResults[examResults.length - 1]?.subjectResults : []}
                averageSubjectList={averageSubjectList ? averageSubjectList : []}
              />
            </div>
          ) : (
            <div>
              <div>
                <IncorrectQuestions submittedMockExamResultId={submittedMockExamResultId} />
              </div>
            </div>
          )}
        </>
      );
    } else if (examResults && examResults.length >= 2) {
      return (
        <>
          <UserExamAttemptsFilterContent
            userExamAttempts={examResults}
            userExamAttempt={userExamAttempt - 1}
            setUserExamAttempt={setUserExamAttempt}
          />
          {isClicked === '시험결과' ? (
            <div className={'flex flex-col gap-y-5'}>
              <MockExamResultReport
                timeLimit={examResults ? examResults[userExamAttempt - 1]?.mockExam.timeLimit : 0}
                totalTakenTime={sumTotalTakenTime}
                totalScore={100}
                score={examResults ? examResults[userExamAttempt - 1]?.totalScore : 0}
                subjectResults={examResults ? examResults[userExamAttempt - 1]?.subjectResults : []}
              />
              <TakenTimeGraphReport
                totalTakenTime={sumTotalTakenTime}
                subjectResults={examResults ? examResults[userExamAttempt - 1]?.subjectResults : []}
                averageSubjectList={averageSubjectList ? averageSubjectList : []}
                timeLimit={examResults ? examResults[userExamAttempt - 1]?.mockExam.timeLimit : 0}
              />
              <AccuracyChart
                subjectResults={examResults ? examResults[userExamAttempt - 1]?.subjectResults : []}
                averageSubjectList={averageSubjectList ? averageSubjectList : []}
              />
            </div>
          ) : (
            <div>
              <div>
                <IncorrectQuestions
                  submittedMockExamResultId={examResults ? examResults[userExamAttempt - 1]?.mockExamResultId : 0}
                />
              </div>
            </div>
          )}
        </>
      );
    } else {
      return null; // examResults가 비어 있는 경우 null을 반환
    }
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'성적리포트'} onBack={onBack}></Header>
      <MockExamReportHeader isClicked={isClicked} setIsClicked={setIsClicked} />
      <div className={'bg-gray0 min-h-screen p-5'}>{displayComponentBasedOnExamResults(examResults)}</div>
      <div className={'h-[60px]'} />
      <NavBar />
    </>
  );
};

export default Result;
