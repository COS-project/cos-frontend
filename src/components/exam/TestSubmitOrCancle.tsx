'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';

const TestSubmitOrCancle = () => {
  const [count, setCount] = useState(500);
  const maxItem = 60;
  let availabeItem = 32;

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  return (
    <>
      <div className="w-full px-5 h-[60px] py-[12px] flex justify-between">
        <button
          className={'py-2 px-3 rounded-3xl text-primary border border-primary bg-white'}
          onClick={() =>
            Swal.fire({
              title: '그만 두시겠습니까?',
              text: '그만두면 기존에 풀었던 내용들은 저장되지 않습니다.',
              confirmButtonText: '그만두기',
              cancelButtonText: '닫기',
              confirmButtonColor: '#000000',
              cancelButtonColor: '#054354',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire('그만둡니다.', '', 'info');
              }
            })
          }>
          그만두기
        </button>
        <span className={'px-10 rounded-lg bg-white'}>{count}</span>
        <button className={'py-2 px-3 rounded-3xl text-white bg-primary'}>제출하기</button>
      </div>
    </>
  );
};

export default TestSubmitOrCancle;
