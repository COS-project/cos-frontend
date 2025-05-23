import { ResponsiveRadar } from '@nivo/radar';
import { useEffect, useState } from 'react';

import { CorrectRateGraphType } from '@/types/exam/type';
import { AverageSubjectInfoType } from '@/types/home/type';

interface Props {
  subjectResults: AverageSubjectInfoType[];
}

const AverageAccurayChat = (props: Props) => {
  const { subjectResults } = props;

  const [subjectData, setSubjectData] = useState<CorrectRateGraphType[]>([]);

  useEffect(() => {
    if (subjectResults) {
      const transformedData: CorrectRateGraphType[] = subjectResults.map((result) => ({
        subjectTitle: result.subject.subjectName,
        subjectCorrectRate: result.correctRate,
      }));
      setSubjectData(transformedData);
    }
  }, [subjectResults]);

  return (
    <div className={'bg-white rounded-[32px]'}>
      <div className={'font-semibold px-5 mt-5 text-h3'}>과목별 정답률</div>
      <div className={'flex flex-col items-center justify-center w-full'} style={{ height: '280px' }}>
        {subjectResults.length > 0 ? (
          <ResponsiveRadar
            // @ts-ignore
            data={subjectData}
            keys={['subjectCorrectRate']}
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
            curve="linearClosed"
          />
        ) : (
          <p className={'font-pre'}>과목별 정답률이 아직 생성되지 않았어요</p>
        )}
      </div>
    </div>
  );
};
export default AverageAccurayChat;
