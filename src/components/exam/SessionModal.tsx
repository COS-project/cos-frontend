import Link from 'next/link';
import { SVGProps, useEffect, useState } from 'react';
import React from 'react';

import useGetExamResultRecent from '@/lib/hooks/useGetExamResultRecent';
import useGetExamResults from '@/lib/hooks/useGetExamResults';

import SubjectGradeCard from './SubjectGradeCard';

interface SessionModalProps {
  round: number;
  MockExamId: number;
  closeModal: () => void;
  openTimerModal: () => void;
  total: number;
}

const SessionModal: React.FC<SessionModalProps> = ({ round, MockExamId, closeModal, openTimerModal, total }) => {
  const [changedRound, setChangedRound] = useState<number>(0);
  const { examResults } = useGetExamResults(MockExamId);

  useEffect(() => {
    if (round) {
      setChangedRound(round);
    }
  }, [round]);

  return (
    <div>
      <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="w-[80%]">
          <button onClick={closeModal} className="w-full flex justify-end text-white text-h6 px-2 my-2">
            닫기 X
          </button>
          <div className="relative bg-white rounded-[32px]">
            <div className="flex flex-col gap-y-4 p-5">
              <div className=" flex justify-center text-h4 font-bold">
                <div>{`${round}회차`}</div>
              </div>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between">
                {examResults && examResults[examResults?.length - 1]?.totalScore ? (
                  <Link
                    href={'/exam/report'}
                    className="absolute right-5 px-3 py-2 flex gap-x-2 items-center bg-gray0 rounded-full text-h6">
                    <span>성적 리포트</span> <MoveIcon />
                  </Link>
                ) : null}
                <div>
                  <div className="font-semibold text-h6">최근 점수</div>
                  {examResults && examResults[examResults?.length - 1]?.totalScore ? (
                    <div className={''}>
                      <div className="flex items-end">
                        <div className="font-bold text-h1">{examResults[examResults?.length - 1].totalScore}점</div>
                        <div className="text-gray3 text-h6 mb-1">/{`${total}점`}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-bold text-h1">미응시</div>
                  )}
                </div>
              </div>
              <div>
                {examResults && examResults[examResults?.length - 1]?.subjectResults
                  ? (
                  <div className={'flex flex-col gap-y-2'}>
                    <div className="text-h6 font-semibold">과목별 맞춘 문제 수</div>
                    <div className={'flex'}>
                      {examResults[examResults?.length - 1]?.subjectResults?.map((subjectResult, index) => {
                        return (
                          <div className={'w-full'} key={index}>
                            <SubjectGradeCard
                              name={subjectResult.subject.subjectName}
                              correctAnswer={subjectResult.numberOfCorrect}
                              totalCorrect={20}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center">
                <button onClick={() => openTimerModal()} className="w-full bg-black text-white rounded-3xl text-h5 p-4">
                  시험 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;

const BeforeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m18 22-8-8 8-8" />
  </svg>
);

const AfterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m10 6 8 8-8 8" />
  </svg>
);

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);
