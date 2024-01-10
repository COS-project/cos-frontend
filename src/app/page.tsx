'use client';

import Link from 'next/link';
import React from 'react';

import CertificationClassificationItem from '../components/onboarding/CertificationClassificationItem';

export default function page() {
  return (
    <>
      <div className="text-h1 font-bold">자격증이 쉬워지는 서비스</div>
      <div
        className="
          grid
          gap-y-2
          justify-center
          items-center
          ">
        <Link href="/home">
          <div
            className="
                    bg-gray2
                    p-3
                    font-semibold
                    ">
            홈화면으로 이동하기
          </div>
        </Link>
        <Link href="/onboarding">
          <div
            className="
                    bg-gray2
                    p-3
                    font-semibold
                    ">
            카카오로 계속하기
          </div>
        </Link>
      </div>
    </>
  );
}
