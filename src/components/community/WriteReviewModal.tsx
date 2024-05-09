const WriteReviewModal = () => {
  return (
    <>
      <div
        className={
          'absolute left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-8 min-h-screen'
        }>
        <div className={'flex flex-col bg-white rounded-[32px] p-5'}>
          <div>
            <div className={'text-h2 font-semibold text-black'}>컴퓨터 활용능력</div>
            <div className={'text-h2 font-semibold text-black'}>시험은 어땠나요?</div>
          </div>
          <div className={'flex items-center text-h6'}>크루들에게 시험 후기를 공유해보세요!</div>
          <div className={'grid-cols-3'}>
            <button>너무 쉬워요</button>
            <button>쉬워요</button>
            <button>보통이에요</button>
            <button>조금 어려워요</button>
            <button>어려워요</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default WriteReviewModal;
