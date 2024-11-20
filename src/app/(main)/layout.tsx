'use client';

import NavBar from '@/components/common/NavBar';
import StopwatchFloating from '@/components/common/StopwatchFloating';
import Timer from '@/components/common/Timer';
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
      {/* 시분초가 모두 0이라면 플로팅 버튼이 뜨도록 설정 */}
      {sStopwatchTime == 0 && mStopwatchTime == 0 && hStopwatchTime == 0 ? null : <StopwatchFloating />}
      {/* <Timer></Timer> */}
      <NavBar />
    </>
  );
}
