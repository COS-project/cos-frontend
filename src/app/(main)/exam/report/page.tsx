'use client';
import React from 'react';
import { useRecoilState } from 'recoil';

import { Session } from '@/types/global'; // Session 타입의 경로에 따라 수정
import { selectedSessionState } from '@/utils/recoilState';
const Report: React.FC = () => {
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);

  return (
    <div>
      <div className="w-[90%]">{selectedSession?.sessionNumber}</div>
    </div>
  );
};

export default Report;
