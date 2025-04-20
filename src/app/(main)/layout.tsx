'use client';

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import AccumulatedTime from '@/components/stopwatch/AccumulatedTime';
import StopwatchAlert from '@/components/stopwatch/StopwatchAlert';
import { onModalAtom } from '@/recoil/stopwatch/atom';

export default function layout({ children }: { children: React.ReactNode }) {
  const [onModal, setOnModal] = useRecoilState<boolean>(onModalAtom); //기록하기 알림창 onoff조절
  const [onAccumulatedModal, setOnAccumulatedModal] = useState<boolean>(false); //기록완료 알림창 onoff조절
  return (
    <>
      {onModal ? ( //기록하기 알림창 열림OnOff
        <StopwatchAlert setOnAccumulatedModal={setOnAccumulatedModal} setOnModal={setOnModal} />
      ) : null}
      {onAccumulatedModal ? ( //기록완료 알림창OnOff
        <AccumulatedTime setOnAccumulatedModal={setOnAccumulatedModal} />
      ) : null}
      <div>{children}</div>
    </>
  );
}
