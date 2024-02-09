'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import useGetAllCertifications from '@/lib/hooks/useGetAllCertifications';
import { useRecoilState } from 'recoil';
import { certificationsListState } from '@/recoil/atom';
import { Certificate } from '@/types/global';

const OnBoarding = () => {
  const parameter = useSearchParams();
  const accessToken: string | null = parameter.get('accessToken');
  const refreshToken: string | null = parameter.get('refreshToken');

  // 데이터 패칭
  const { certificationsList, isLoading, isError } = useGetAllCertifications();

  const [allCertifications, setAllCertifications] = useRecoilState(certificationsListState);

  const [step, setStep] =
    useState<'ChooseCertification' | 'CertificationPriority'>('ChooseCertification')
  const router = useRouter();

  /**
   * Recoil 상태를 초기화하는 함수
   * @param apiResponse Certification id와 name
   */
  const initializeGoalSettingState = (apiResponse: Certificate[]) => {
    return apiResponse.map((res) => ({
      certificateId: res.certificateId,
      certificateName: res.certificateName,
    }));
  };

  /**
   * API 에서 데이터를 가져와 Recoil 상태 업데이트 해주는 함수
   */
  const fetchDataAndUpdateState = async () => {
    try {
      const response = certificationsList;
      if (response) {
        const initialState: Certificate[] = initializeGoalSettingState(response);
        setAllCertifications(initialState); // 여기에서 변환된 배열을 Recoil 상태에 설정
      } else {
        console.error('Failed to fetch goal setting data');
      }
    } catch (error) {
      console.error('Error fetching goal setting data:', error);
    }
  };

  const moveUnSignUp = () => {
    router.push('/');
  };

  const moveHome = () => {
    router.push('/home');
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    fetchDataAndUpdateState();
  }, [accessToken, refreshToken, certificationsList]);

  return (
    <main>
      {step == 'ChooseCertification' && (
        <ChooseCertification onNext={() => setStep('CertificationPriority')} onBefore={moveUnSignUp} />
      )}
      {step == 'CertificationPriority' && (
        <CertificationPriority onNext={moveHome} onBefore={() => setStep('CertificationPriority')} />
      )}
    </main>
  );
};
export default OnBoarding;
