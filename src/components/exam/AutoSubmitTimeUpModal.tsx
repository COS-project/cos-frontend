import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Props {
  isAutoSubmitTimeUpModalOpen: boolean;
  setIsAutoSubmitTimeUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoSubmitTimeUpModal = (props: Props) => {
  const { isAutoSubmitTimeUpModalOpen, setIsAutoSubmitTimeUpModalOpen } = props;
  const router = useRouter();

  /**
   * 제출 버튼을 눌렀을 때, 결과 페이지로 이동하는 함수
   */
  const onMove = () => {
    router.push('/exam/result');
  };

  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>시간이 종료되었어요!</div>
            <div>
              <div className={'flex items-center text-h6'}>지금까지 푼 문제들이 제출됩니다.</div>
            </div>
          </div>
          <div className={'flex justify-end gap-x-2'}>
            <button
              onClick={() => {
                setIsAutoSubmitTimeUpModalOpen(!isAutoSubmitTimeUpModalOpen);
                onMove();
              }}
              className={'bg-black rounded-full text-white py-[7px] px-3'}>
              확인
            </button>
          </div>
        </div>
      </div>

    </>
  );
};
export default AutoSubmitTimeUpModal;
