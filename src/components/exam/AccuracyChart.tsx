import { ResponsiveRadar } from '@nivo/radar';
import { useEffect, useState } from 'react';

import { CorrectRateGraphType, SubjectResultsType } from '@/types/exam/type';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: SubjectResultsType[];
  averageSubjectList: AverageSubjectInfoType[];
}
const AccuracyChart = (props: Props) => {
  const { subjectResults, averageSubjectList } = props;

  const [subjectData, setSubjectData] = useState<CorrectRateGraphType[]>([]);

  useEffect(() => {
    if (subjectResults) {
      const transformedData: CorrectRateGraphType[] = subjectResults.map((result, index) => ({
        subjectTitle: result.subject.subjectName,
        subjectCorrectRate: result.correctRate,
        averageSubjectRate: averageSubjectList.length !== 0 ? averageSubjectList[index].correctRate : 0,
      }));
      setSubjectData(transformedData);
    }
  }, [subjectResults]);

  return (
    <div className={'bg-white rounded-[32px]'}>
      <div className={'font-semibold px-5 mt-5 text-h3'}>과목별 정답률</div>
      <div className={'w-full'} style={{ height: '280px' }}>
        <ResponsiveRadar
          // @ts-ignore
          data={subjectData}
          keys={['subjectCorrectRate', 'averageSubjectRate']}
          indexBy="subjectTitle"
          valueFormat=" >-.2f"
          margin={{ top: 30, right: 70, bottom: 0, left: 70 }}
          // maxValue={subjectResults[0].subject.totalScore} // 최댓값을 부여할지 말지 고민
          borderWidth={1}
          borderColor={({ key }) => {
            if (key === 'subjectCorrectRate') return '#3B3DFF';
            if (key === 'averageSubjectRate') return '#9E9FA1';
            return '#000000'; // fallback
          }}
          gridShape="linear"
          gridLabelOffset={13}
          dotLabelYOffset={-3}
          enableDots={true}
          dotSize={2}
          enableDotLabel={true}
          dotBorderColor={{ theme: 'background' }}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotLabel="value"
          colors={['#3B3DFF1A', '#9E9FA133']} // ✅ 커스텀 색상 배열
          // colors={{ scheme: 'blues', size: 5 }}
          fillOpacity={1}
          blendMode="multiply"
          motionConfig="wobbly"
        />
      </div>

      {/* Custom Legends */}
      <div className={'flex items-center gap-x-3 justify-center mb-4'}>
        <div className={'flex items-center gap-x-1'}>
          <div className={'bg-primary w-[20px] h-[8px] rounded-full'} />
          <span className={'text-h6'}>회차</span>
        </div>
        <div className={'flex items-center gap-x-1'}>
          <div className={'bg-[#9E9FA1] w-[20px] h-[8px] rounded-full'} />
          <span className={'text-h6'}>평균</span>
        </div>
      </div>
    </div>
  );
};
export default AccuracyChart;
