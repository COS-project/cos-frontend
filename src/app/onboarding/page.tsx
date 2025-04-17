'use client';

import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Spinner from '@/components/common/Spinner';
import CertificationPriority from '@/components/onboarding/CertificationPriority';
import ChooseCertification from '@/components/onboarding/ChooseCertification';
import ProfileSettings from '@/components/onboarding/ProfileSettings';

const OnBoardingComponents = () => {
  const searchParams = useSearchParams();
  const rawAccessToken = searchParams.get('accessToken') || '';
  const rawRefreshToken = searchParams.get('refreshToken') || '';

  const accessToken = rawAccessToken.replace('%20', ' ');
  const refreshToken = rawRefreshToken.replace('%20', ' ');

  const [isCookieSet, setIsCookieSet] = useState(false); // ✅ 쿠키 저장 여부

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
    if (accessToken && refreshToken) {
      Cookies.set('accessToken', accessToken, { expires: Date.now() + 604800000 });
      Cookies.set('refreshToken', refreshToken, { expires: Date.now() + 604800000 });
      setIsCookieSet(true); // ✅ 쿠키 저장 완료 표시
    } else {
      setIsCookieSet(false); // 없더라도 로딩이 멈추게
    }
  }, [accessToken, refreshToken]);

  // ✅ 쿠키 저장 전이면 로딩 UI
  if (!isCookieSet) {
    return <Spinner />;
  }

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
    <Suspense fallback={<Spinner />}>
      <OnBoardingComponents />
    </Suspense>
  );
}
