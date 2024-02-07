'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import { layoutState } from '@/recoil/atom';
import css from 'styled-jsx/css';

export default function Home() {
  const router = useRouter();
  const parameter = useSearchParams();
  const accessToken: string | null = parameter.get('accessToken');
  const refreshToken: string | null = parameter.get('refreshToken');
  const [step, setStep] = useRecoilState(layoutState);

  const moveExamInfo = () => {
    router.push('/home/exam-info');
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [accessToken, refreshToken]);

  return (
    <div>
      <div>홈페이지 입니다.</div>
      {/* TODO: className 컴포넌트로 빼기 */}
      <Button className={'border-gray-button'} onClick={moveExamInfo} Icon={Icon} onStep={setStep('Home')}>
        응시정보 확인
      </Button>
      <button
        className={'bg-primary text-white'}
        onClick={() => {
          router.push('/home/goal-setting');
        }}>목표설정</button>
    </div>
  );
}

function Icon(props) {
  return (
    <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 11.5l6-6M5 5.5h6v6" stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
