import { motion } from 'framer-motion';
import Link from 'next/link';
import { SVGProps, useEffect, useState } from 'react';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Spinner from '@/components/common/Spinner';
import useDelayOver from '@/hooks/useDelayOver';
import useGetTestResults from '@/lib/hooks/useGetTestResults';
import { SubjectResultsType } from '@/types/exam/type';

import SubjectGradeCard from './SubjectGradeCard';

interface SessionModalProps {
  round: number;
  mockExamId: number;
  closeModal: () => void;
  openTimerModal: () => void;
  total: number;
}

const SessionModal: React.FC<SessionModalProps> = ({ round, mockExamId, closeModal, openTimerModal, total }) => {
  const [changedRound, setChangedRound] = useState<number>(0);
  const { examResults, isLoading, isError } = useGetTestResults(mockExamId);
  const isDelayOver = useDelayOver(200, examResults);

  useEffect(() => {
    if (round) {
      setChangedRound(round);
    }
  }, [round]);

  if (!examResults) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="fixed inset-0 left-0 right-0 top-0 z-50 flex flex-col justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen">
        <motion.div
          className={'flex flex-col gap-y-2'}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          <button onClick={closeModal} className="w-full flex justify-end items-center text-white text-h6 px-2 my-2">
            닫기 <CancleIcon />
          </button>
          <div className="relative bg-white rounded-[32px]">
            <div className="flex flex-col gap-y-4 p-5">
              <div className=" flex justify-center">
                {!examResults ? <Skeleton height={24} width={70} borderRadius={8} /> : <div>{`${round}회차`}</div>}
              </div>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between">
                {!examResults ? (
                  <div className="absolute right-5">
                    <Skeleton height={37} width={112} borderRadius={999} />
                  </div>
                ) : examResults.length !== 0 ? (
                  <Link
                    href={'/exam/result'}
                    className="absolute right-5 px-3 py-2 flex gap-x-2 items-center bg-gray0 rounded-full text-h6">
                    <span>성적 리포트</span> <MoveIcon />
                  </Link>
                ) : null}
                <div>
                  {/* 점수 */}
                  {!examResults ? (
                    <Skeleton height={21} width={60} borderRadius={8} />
                  ) : (
                    <div className="font-semibold text-h6">최근 점수</div>
                  )}
                  {}
                  {!examResults ? (
                    <Skeleton height={30} width={93} borderRadius={8} />
                  ) : examResults.length === 0 ? (
                    <div className="font-bold text-h1">미응시</div>
                  ) : (
                    <>
                      {examResults[examResults.length - 1].totalScore !== undefined ? (
                        <div className={''}>
                          <div className="flex items-end">
                            <div className="font-bold text-h1">{examResults[examResults?.length - 1].totalScore}점</div>
                            <div className="text-gray3 text-h6 mb-1">/{`${total}점`}</div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>

              {/* 과목별 맞춘 문제 갯수 표 */}
              <div>
                {!isDelayOver || !examResults || isLoading ? (
                  <div className={'flex flex-col gap-y-2'}>
                    <Skeleton height={20} width={120} borderRadius={8} />
                    <Skeleton height={81} width={257} />
                  </div>
                ) : (
                  <div className={'flex flex-col gap-y-2'}>
                    {examResults && examResults.length === 0 ? null : (
                      <div className="text-h6 font-semibold">과목별 맞춘 문제 수</div>
                    )}

                    <table className="table-fixed w-full border border-gray2 border-collapse">
                      <tbody>
                        {(examResults[examResults.length - 1]?.subjectResults ?? [])
                          .reduce((rows, item, index) => {
                            const rowIndex = Math.floor(index / 3);
                            if (!rows[rowIndex]) rows[rowIndex] = [];
                            rows[rowIndex].push(item);
                            return rows;
                          }, [] as SubjectResultsType[][])
                          .map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((subjectResult, colIndex) => (
                                <td key={colIndex} className="border border-gray2 p-0 align-top">
                                  <SubjectGradeCard
                                    name={subjectResult.subject.subjectName}
                                    correctAnswer={subjectResult.numberOfCorrect}
                                    totalCorrect={subjectResult.subject.numberOfQuestions}
                                  />
                                </td>
                              ))}
                              {/* 마지막 행에 칸이 3개 미만일 경우 빈 셀 채우기 */}
                              {Array.from({ length: 3 - row.length }).map((_, idx) => (
                                <td key={`empty-${idx}`} className="border border-white p-0"></td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <button onClick={() => openTimerModal()} className="w-full bg-black text-white rounded-3xl text-h5 p-4">
                  시험 보기
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SessionModal;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);

const CancleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m12 12.708-5.246 5.246a.5.5 0 0 1-.344.15.47.47 0 0 1-.364-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.292 12 6.046 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16L12 11.292l5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L12.708 12l5.246 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
