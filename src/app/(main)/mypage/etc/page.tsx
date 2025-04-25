'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { SVGProps } from 'react';

import Header from '@/components/common/Header';

const ETCPage = () => {
  const router = useRouter();
  return (
    <div className={'bg-gray0 min-h-screen'}>
      <Header headerType={'dynamic'} title={'약관 및 개인정보 처리'} />
      <div className={'h-[100px]'} />
      <section className={'px-5'}>
        <div className={'rounded-[24px] bg-white p-4 flex flex-col gap-y-3'}>
          <h4 className={'text-h6 text-gray4'}>약관 및 개인정보 처리</h4>
          <div className={'flex flex-col gap-y-2'}>
            <button
              onClick={() => {
                router.push('/mypage/etc/marketing-info');
              }}
              className={'flex justify-between rounded-[16px] bg-gray0 py-4 px-5 text-h6'}>
              마케팅 정보 수신 동의
              <MoveIcon />
            </button>
            <button
              onClick={() => {
                router.push('/mypage/etc/personal-info');
              }}
              className={'flex justify-between rounded-[16px] bg-gray0 py-4 px-5 text-h6'}>
              개인 정보 처리 방침
              <MoveIcon />
            </button>
            <button
              onClick={() => {
                router.push('/mypage/etc/terms-agreement');
              }}
              className={'flex justify-between rounded-[16px] bg-gray0 py-4 px-5 text-h6'}>
              서비스 이용 약관
              <MoveIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ETCPage;

const MoveIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#9E9FA1" strokeLinecap="round" strokeLinejoin="round" d="m7.5 5.5 5 5-5 5" />
  </svg>
);
