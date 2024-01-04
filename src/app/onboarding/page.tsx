'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';

const OnBoarding = () => {
  const [step, setStep] =
    useState<'ChooseCertification' | 'CertificationPriority'>('ChooseCertification')
  const router = useRouter();

  const moveUnSignUp = () => {
    router.push('/');
  }
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
