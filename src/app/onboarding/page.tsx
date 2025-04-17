'use client';

import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import ProfileSettings from '@/components/onboarding/ProfileSettings';

const OnBoardingComponents = () => {
  const searchParams = useSearchParams();
  const rawAccessToken = searchParams.get('accessToken') || '';
  const rawRefreshToken = searchParams.get('refreshToken') || '';

  const accessToken = rawAccessToken.replace('%20', ' ');
  const refreshToken = rawRefreshToken.replace('%20', ' ');

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
      Cookies.set('accessToken', accessToken);
    }
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken);
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
export default function OnBoarding() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnBoardingComponents />
    </Suspense>
  );
}
