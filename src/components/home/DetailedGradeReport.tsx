const DetailedGradeReport = () => {
  return (
    <>
      <div className={'rounded-[24px] border-[1px] border-gray2 bg-white'}>
        <div className={'flex justify-around py-4 rounded-[24px] bg-gray0 border-b-[1px] border-gray2 bg-gray0'}>
          <div className={'font-semibold text-h6'}>월요일</div>
          <div className={'font-semibold text-h6'}>치룬 모의고사</div>
          <div className={'font-semibold text-h6'}>점수</div>
        </div>
        {/* 주간 성적 */}
        <div >
          <div className={'flex justify-around py-4 text-h6'}>
            <div>1</div>
            <div>2023년도 1회차</div>
            <div>40점</div>
          </div>
          <div className={'flex justify-around py-4 text-h6'}>
            <div>2</div>
            <div>2023년도 3회차</div>
            <div>40점</div>
          </div>
          <div className={'flex justify-around py-4 text-h6'}>
            <div>3</div>
            <div>2023년도 2회차</div>
            <div>40점</div>
          </div>
          <div className={'flex justify-around py-4 text-h6'}>
            <div>4</div>
            <div>2023년도 3회차</div>
            <div>40점</div>
          </div>
        </div>
        <div
          className={
            'flex justify-center text-primary text-h6 font-semibold border-t-[1px] border-gray2 rounded-b-[24px] py-4 bg-white'
          }>
          <div>평균 점수: 53.75</div>
        </div>
      </div>
    </>
  );
};
export default DetailedGradeReport;
