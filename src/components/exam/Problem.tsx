import { ProblemInfo } from '@/types/global';
import { useState } from 'react';
import { problemData } from '@/utils/examDummyData';
import { AllQuestionModal } from './AllQuestionModal';

// MISSON : 직접 구조분해 할당 해서 데이터를 정리하세요.
const Problem = () => {
  //problemidx = 0
  const [problemIdx, setProblemIdx] = useState<number>(0);

  const problemLength = problemData?.length;
  const { problemNum, choiceAnswer } = problemData[problemIdx];
  const { problem, example } = choiceAnswer; //구조분해 할당
  const [clicked, setClicked] = useState(false);
  const onClick = () => setClicked(!clicked);
  const [allQuestionModalIsOpen, setAllQuestionModalIsOpen] = useState(false);

  const openModal = () => {
    setAllQuestionModalIsOpen(true);
  };

  const closeModal = () => {
    setAllQuestionModalIsOpen(false);
  };

  return (
    <>
      <div className={'w-full px-3 h-[60px] py-[12px] mt-8'}>
        <div className={'text-h3 text-gray4'} onClick={openModal}>
          {problemNum}/{problemLength}번<button className={'text-h3 text-black'}>▽</button>
          <div className={'mt-4 font-bold text-black'}>{problem}</div>
        </div>
        {example.map(
          (
            ex,
            idx, //ex : 불러올 데이터, idx : 순서
          ) => (
            <button
              key={ex}
              className={`${
                clicked
                  ? 'w-full px-5 items-center mt-5 h-auto flex justify-center border border-gray1 rounded-2xl border border-black bg-gray0'
                  : 'w-full px-5 items-center mt-5 h-auto flex justify-center border border-gray1 rounded-2xl'
              }`}
              onClick={() => onClick()}>
              {idx + 1}. {ex}
            </button> // key값을 지정하지않으면 순서를 알 수 없다.
            //리액트에선 idx를 키값으로하는것을 권장하지 않음.(순서에 대한 혼란)
          ),
        )}
        <div>
          {problemNum === 1 ? (
            <button
              onClick={() => setProblemIdx((prev) => prev + 1)}
              className={'w-full mt-8 px-5 py-3 border border-primary rounded-2xl'}>
              다음
            </button>
          ) : problemNum === problemLength ? (
            <button
              className={'w-full mt-8 px-5 py-3 border border-primary rounded-2xl'}
              onClick={() => setProblemIdx((prev) => prev - 1)}>
              이전
            </button>
          ) : (
            <div className={'w-full flex justify-between mt-8'}>
              <button
                className={'px-5 py-3 w-[40%] border border-primary rounded-2xl '}
                onClick={() => setProblemIdx((prev) => prev - 1)}>
                이전
              </button>
              <button
                className={'px-5 py-3 w-[40%] border border-primary rounded-2xl'}
                onClick={() => setProblemIdx((prev) => prev + 1)}>
                다음
              </button>
            </div>
          )}
          {allQuestionModalIsOpen ? <AllQuestionModal closeModal={closeModal} /> : null}
        </div>
      </div>
    </>
  );
};

export default Problem;
