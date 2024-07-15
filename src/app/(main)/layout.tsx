'use client';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import StopwatchFloating from '@/components/common/StopwatchFloating';
import { hStopwatchTimeState, mStopwatchTimeState, sStopwatchTimeState } from '@/recoil/stopwatch/atom';
import { useRecoilState } from 'recoil';

export default function layout({ children }: { children: React.ReactNode }) {
  const [hStopwatchTime, setHStopwatchTime] = useRecoilState(hStopwatchTimeState);
  const [mStopwatchTime, setMStopwatchTime] = useRecoilState(mStopwatchTimeState);
  const [sStopwatchTime, setSStopwatchTime] = useRecoilState(sStopwatchTimeState);
  return (
    <>
      {/* <Header /> */}
      <div>
        {children}
        {/*<Link href="/">온보딩 화면으로 아동하기</Link>*/}
      </div>
      {sStopwatchTime == 0 && mStopwatchTime == 0 && hStopwatchTime == 0 ? null : <StopwatchFloating />}

      <NavBar />
    </>
  );
}
