'use client';

import { useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import { useRouter } from 'next/navigation';

const EditInterestCertification = () => {
  const [step, setStep] = useState<'ChooseCertification' | 'CertificationPriority'>('ChooseCertification');
  const router = useRouter();

  const moveMyPage = () => {
    router.push('/mypage');
  };

  return (
    <main>
      {step === 'ChooseCertification' && (
        <ChooseCertification onNext={() => setStep('CertificationPriority')} onBefore={moveMyPage} />
      )}
      {step === 'CertificationPriority' && (
        <CertificationPriority onNext={moveMyPage} onBefore={() => setStep('ChooseCertification')} />
      )}
    </main>
  );
};
export default EditInterestCertification;
