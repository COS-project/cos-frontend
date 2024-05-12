import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useRecoilState } from 'recoil';

import { stopwatchIsPaused, timerIsPaused } from '@/recoil/exam/atom';

interface Props {
  isUnsavedChangesWarningModalOpen: boolean;
  setIsUnsavedChangesWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnsavedChangesWarningModal = (props: Props) => {
  const { isUnsavedChangesWarningModalOpen, setIsUnsavedChangesWarningModalOpen } = props;
  // 모달창을 띄우면 타이머를 잠시 멈추게 하는 state
  const [isPausedTimer, setIsPausedTimer] = useRecoilState(timerIsPaused);
  // 문제당 머문시간을 잠시 멈추는
  const [isPausedStopWatch, setIsPausedStopWatch] = useRecoilState(stopwatchIsPaused);
  const router = useRouter();

  /**
   * 응시를 그만둘때, 이전 페이지로 이동하는 함수
   */
  const onMove = () => {
    router.push('/exam');
  };

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>그만 두시겠습니까?</div>
            <div>
              <div className={'flex items-center text-h6'}>그만두면 기존에 풀었던</div>
              <div className={'text-h6'}>내용들은 저장되지 않습니다.</div>
            </div>
          </div>
          <div className={'flex justify-end gap-x-2'}>
            <button
              onClick={() => {
                setIsPausedTimer(!isPausedTimer);
                setIsPausedStopWatch(!isPausedStopWatch);
                setIsUnsavedChangesWarningModalOpen(!isUnsavedChangesWarningModalOpen);
              }}
              className={'bg-gray1 rounded-full text-gray4 py-[7px] px-4'}>
              닫기
            </button>
            <button
              onClick={() => {
                onMove();
                setIsUnsavedChangesWarningModalOpen(!isUnsavedChangesWarningModalOpen);
              }}
              className={'bg-black rounded-full text-white py-[7px] px-3'}>
              그만두기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UnsavedChangesWarningModal;
