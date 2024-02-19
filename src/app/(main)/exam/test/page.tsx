'use client';

import Question from '@/components/exam/Question';
import TestSubmitOrCancle from '@/components/exam/TestSubmitOrCancle';

const Test = () => {
  return (
    <>
      <div>
        <TestSubmitOrCancle />
        <Question />
      </div>
    </>
  );
};

export default Test;
