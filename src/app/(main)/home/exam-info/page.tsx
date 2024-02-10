'use client';

import { format, getHours } from 'date-fns';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import ExamInfoItem from '@/components/home/ExamInfoItem';
import useGetCertificationInfo from '@/lib/hooks/useGetCertificationInfo';
import { layoutState } from '@/recoil/atom';
import { certificationInfoState } from '@/recoil/home/atom';
import { CertificateInfoType, GoalSettingInfo } from '@/types/global';
import { commonTitle } from '@/utils/exam-info/CommonTitle';

const ExamInfo = () => {
  // 데이터 패칭
  const { certificationInfo, isLoading, isError } = useGetCertificationInfo();

  const [data, setData] = useRecoilState(certificationInfoState);

  const [step, setStep] = useRecoilState(layoutState);
  const router = useRouter();

  // TODO:접수하기 링크 바꾸기
  const onMove = () => {
    router.push('/home');
  };

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse certificationInfo.result
   */
  const initializeCertificationInfoState = (apiResponse: CertificateInfoType) => {
    return {
      examSchedule: {
        applicationStartDateTime:
          '• 접수 시작: ' + format(apiResponse.examSchedule.applicationStartDateTime, 'yyyy.MM.dd'),
        applicationDeadlineDateTime:
          '• 접수 종료: ' + format(apiResponse.examSchedule.applicationDeadlineDateTime, 'yyyy.MM.dd'),
        examDateTime: '• 시험 날짜: ' + format(apiResponse.examSchedule.examDateTime, 'yyyy.MM.dd'),
      },
      examFee: {
        writtenExamFee: '• 필기 시험: ' + apiResponse.examFee.writtenExamFee.toString() + '원',
        practicalExamFee: '• 실기 시험: ' + apiResponse.examFee.practicalExamFee.toString() + '원',
      },
      examTimeLimit: {
        writtenExamTimeLimit:
          '• 필기 시험 시간: ' + getHours(apiResponse.examTimeLimit.writtenExamTimeLimit).toString() + '분',
        practicalExamTimeLimit:
          '• 실기 시험 시간: ' + apiResponse.examTimeLimit.practicalExamTimeLimit.toString() + '분',
      },
      passingCriteria: {
        subjectPassingCriteria:
          '• 과목당 합격 기준: ' + apiResponse.passingCriteria.subjectPassingCriteria.toString() + '점',
        totalAvgCriteria: '• 전체 합격 기준: ' + apiResponse.passingCriteria.totalAvgCriteria.toString() + '점',
        practicalPassingCriteria:
          '• 실기 시험 합격 기준: ' + apiResponse.passingCriteria.practicalPassingCriteria.toString() + '점',
      },
      subjectsInfo: apiResponse.subjectsInfo,
      description: apiResponse.description,
      examFormat: apiResponse.examFormat,
      examEligibility: apiResponse.examEligibility,
    };
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = certificationInfo;
      console.log('response', response);
      if (response) {
        const initialState: CertificateInfoType = initializeCertificationInfoState(response.result);
        setData(initialState);
      } else {
        // 에러 처리를 수행할 수 있습니다.
        console.error('Failed to fetch goal setting data');
      }
    } catch (error) {
      // 네트워크 오류 또는 다른 예외에 대한 처리를 수행할 수 있습니다.
      console.error('Error fetching goal setting data:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchDataAndUpdateState();
  }, [certificationInfo]);

  return (
    <div className="bg-gray0">
      <Button onStep={setStep('ExamInfo')} Icon={Icon} onClick={onMove}>
        접수하기
      </Button>
      <div className="flex flex-col gap-y-5 m-5 mt-4">
        {Object.entries(data).map(([key, item]) => (
          <div key={key}>
            <ExamInfoItem Icon={commonTitle[key].Icon} title={commonTitle[key].title} content={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExamInfo;

function Icon(props) {
  return (
    <svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 11.5l6-6M5 5.5h6v6" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
