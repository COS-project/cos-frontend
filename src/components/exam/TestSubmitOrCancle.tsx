'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import useCalculateScore from '@/hooks/useCalculateScore';

const TestSubmitOrCancle = () => {
  const [timeLeft, setTimeLeft] = useState(5400000);
  const { calculateScore, userAnswerList } = useCalculateScore();
  // 시, 분, 초 계산
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1000)); // 1초(1000밀리초) 감소
    }, 1000);

    return () => clearInterval(id); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [timeLeft]);

  const handleSubmit = async () => {
    const updatedUserAnswerList = calculateScore(); // 채점 실행
  };

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
        <span className={'px-10 rounded-lg bg-white'}>
          {hours} : {minutes} : {seconds}
        </span>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className={'py-2 px-3 rounded-3xl text-white bg-primary'}>
          제출하기
        </button>
      </div>
    </>
  );
};

export default TestSubmitOrCancle;
