'use client';

import Problem from '@/components/exam/Problem';
import TestSubmitOrCancle from '@/components/exam/TestSubmitOrCancle';

const Test = () => {
  return (
    <>
      <div>
        <TestSubmitOrCancle />
        <Problem />
      </div>
    </>
  );
};

export default Test;
