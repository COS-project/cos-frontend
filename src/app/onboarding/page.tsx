'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import ProfileSettings from '@/components/onboarding/ProfileSettings';
import useGetAllCertificates from '@/lib/hooks/useGetAllCertificates';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { certificationsListState } from '@/recoil/atom';
import { Certificate } from '@/types/global';

const OnBoarding = () => {
  const parameter = useSearchParams();
  const accessToken: string | null = parameter.get('accessToken');
  const refreshToken: string | null = parameter.get('refreshToken');

  const [step, setStep] = useState<'ProfileSetting' | 'ChooseCertification' | 'CertificationPriority'>(
    'ProfileSetting',
  );
  const router = useRouter();

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
  }, [accessToken, refreshToken]);

  return (
    <main>
      {step === 'ProfileSetting' && (
        <ProfileSettings onNext={() => setStep('ChooseCertification')} onBefore={moveUnSignUp} />
      )}
      {step === 'ChooseCertification' && (
        <ChooseCertification
          onNext={() => setStep('CertificationPriority')}
          onBefore={() => setStep('ProfileSetting')}
        />
      )}
      {step === 'CertificationPriority' && (
        <CertificationPriority onNext={moveHome} onBefore={() => setStep('ChooseCertification')} />
      )}
    </main>
  );
};
export default OnBoarding;
