'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';

const OnBoarding = () => {
  const parameter = useSearchParams();
  const accessToken: string | null = parameter.get('accessToken');
  const refreshToken: string | null = parameter.get('refreshToken');

  const [step, setStep] =
    useState<'ChooseCertification' | 'CertificationPriority'>('ChooseCertification')
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, [accessToken, refreshToken]);

  const moveUnSignUp = () => {
    router.push('/');
  };

  const moveHome = () => {
    router.push('/home');
  };

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
