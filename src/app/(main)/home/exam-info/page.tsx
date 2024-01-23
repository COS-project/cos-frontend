'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import ExamInfoItem from '@/components/home/ExamInfoItem';
import { layoutState } from '@/recoil/atom';
//TODO: 백엔드에서 과목번호주면 처리
import { COMPUTER_ABILITY_TEST_LEVEL_1 } from '@/utils/home/exam-info/ComputerAbilityTestLevel1';
import { COMPUTER_ABILITY_TEST_LEVEL_2 } from '@/utils/home/exam-info/ComputerAbilityTestLevel2';


const ExamInfo = () => {
  const [step, setStep] = useRecoilState(layoutState);
  const router = useRouter();

  // TODO:접수하기 링크 바꾸기
  const onMove = () => {
    router.push('/home');
  };

  return (
    <div className="bg-gray0">
      <Button onStep={setStep('ExamInfo')} Icon={Icon} onClick={onMove}>
        접수하기
      </Button>
      <div className="flex flex-col gap-y-5 m-5 mt-4">
        {/*TODO: 백엔드에서 과목 받으면 그에 따라 처리*/}
        {Object.entries(SOCIAL_RESEARCH_ANALYST_TEST_LEVEL2).map(([index, item]) => (
          <div key={index}>
            <ExamInfoItem Icon={item.Icon} title={item.title} content={item.content} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExamInfo;

function Icon(props) {
  return (
    <svg
      width={16}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 11.5l6-6M5 5.5h6v6"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

