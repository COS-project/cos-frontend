'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {
  const parameter = useSearchParams();
  const accessToken = parameter.get('accessToken');
  const refreshToken = parameter.get('refreshToken');

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('액세스 토큰', localStorage.getItem('accessToken'));
    console.log('리프레시 토큰', localStorage.getItem('refreshToken'));
  }, [accessToken, refreshToken]);

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
        <Link href="http://cercat.o-r.kr/oauth2/authorization/kakao">
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
