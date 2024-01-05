'use client';

import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <>
      <div>로그인 화면입니다.</div>
      <Link href="/home">
        <div>홈화면으로 이동하기</div>
      </Link>
    </>
  );
}
