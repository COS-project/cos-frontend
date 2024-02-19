import Image from 'next/image';
import React from 'react';

import { UserAnswerRequests } from '@/types/global';

interface Props {
  questionSequence: number;
  questionContent: string;
  questionId: number;
  questionImage: string | null;
  clickedSequence?: number;
  setUserAnswer: React.Dispatch<React.SetStateAction<UserAnswerRequests>>;
}
const QuestionContent = (props: Props) => {
  const { questionSequence, questionId, questionContent, questionImage, setUserAnswer, clickedSequence } = props;

  /**
   * 눌린 번호로 state를 바꾸는 함수
   */
  const resetUserAnswer = () => {
    return new Promise(async (resolve: (value?: unknown) => void) => {
      setUserAnswer((prevState) => ({
        ...prevState,
        selectOption: questionSequence,
        questionId: questionId,
      }));

      // 상태 업데이트 후 즉시 다음 코드가 실행되기 전에 약간의 지연을 주어
      // 상태 업데이트가 반영될 시간을 제공합니다.
      setTimeout(() => resolve(), 0);
    });
  };

  return (
    <div
      onClick={async () => {
        await resetUserAnswer();
      }}
      className={
        clickedSequence === questionSequence
          ? 'border-[1px] border-black bg-gray0 rounded-[16px] p-4'
          : 'border-[1px] border-gray1 rounded-[16px] p-4'
      }>
      <div className="flex gap-x-2 text-h4 items-start">
        <div>{questionSequence}.</div>
        <div>{questionContent}</div>
      </div>
      {questionImage ? <Image src={questionImage} width={100} height={100} alt={questionImage} /> : null}
    </div>
  );
};
export default QuestionContent;
