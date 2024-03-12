import DetailedGradeReport from '@/components/home/DetailedGradeReport';
import GrowthChart from '@/components/home/GrowthChart';

const GrowthChartView = () => {
  return (
    <div className={'bg-gray0'}>
      <div className={'m-5 flex flex-col gap-y-[24px]'}>
        <div>목표 기간 선택</div>
        <GrowthChart />
        <div className={'flex flex-col gap-y-[8px]'}>
          <div className={'text-h3 font-bold ml-2'}>주간 성적 자세히 보기</div>
          <div className={'flex flex-col gap-y-[12px]'}>
            <DetailedGradeReport />
            <DetailedGradeReport />
            <DetailedGradeReport />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChartView;
