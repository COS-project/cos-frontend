'use client';

import React, { useEffect, useState } from 'react';
import Problem from './Problem';
import { problemData } from '@/utils/examDummyData';

interface AllQuestionModalProps {
  closeModal: () => void;
}

export const AllQuestionModal = (props: AllQuestionModalProps) => {
  const { closeModal } = props;
  const problemLength = problemData?.length;
  const [btnActive, setBtnActive] = useState('');

  // function toggleActive(e) {
  //   setBtnActive((prev) => {
  //     return e.target.value;
  //   });
  // }

  return (
    <>
      <div className={'p-5 fixed inset-0 flex justify-center bg-black bg-opacity-30'}>
        <div className={'w-[90%]'}>
          <div className={'bg-white rounded-3xl'}>
            <div>
              <h2 className={'flex justify-center text-h3 font-bold p-4'}>
                <div>문항 번호 전체보기</div>
              </h2>
              <div className={'flex text-gray4 text-h4 justify-center font-bold'}>
                문제 번호를 눌러 해당 문제로 이동하세요.
              </div>
              <div className={'mt-8 flex justify-center text-h6'}>
                <div className={'mt-1.5 rounded-3xl bg-second w-[20px] h-[8px]'}></div>
                <div className={'ml-3 text-gray4'}>푼 문제</div>
                <div className={'ml-5 mt-1.5 rounded-3xl bg-sky w-[20px] h-[8px]'}></div>
                <div className={'ml-3 text-gray4'}>안 푼 문제</div>
              </div>
              <div className={'mt-8 grid grid-cols-5'}>
                {problemData.map((pro, idx) => (
                  <button value={idx}>
                    {pro.problemNum % 3 === 0 ? (
                      <div className={'mx-auto w-[48px] h-[48px] rounded-lg text-white bg-sky mb-4'}>
                        {pro.problemNum}
                      </div>
                    ) : (
                      <div className={'mx-auto w-[48px] h-[48px] rounded-lg text-white mb-4 bg-second'}>
                        {pro.problemNum}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {/* 이곳에는 map함수를 써서 구현해야함. 
              1. ProblemInfo[] 내의 problemNum을 받아와서 ?
              2. ProblemData.length만큼 번호칸을 생성한다. 
              3. 풀었는지 ischecked이런거 써서 체크하는거,,, 해야되고
              4. 누르면 그 해당 번호로 이동할 수 있게 해야한다......
              5. 클릭하면 하나만 클릭되게 해야됨 */}
            </div>
          </div>
          <button className={'p-3 mt-3 w-full rounded-3xl bg-white '} onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </>
  );
};
