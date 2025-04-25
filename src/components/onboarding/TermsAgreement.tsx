import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/common/Header';

interface Props {
  onNext: () => void;
  onBefore: () => void;
}

const TermsAgreement = (props: Props) => {
  const { onNext, onBefore } = props;
  const router = useRouter();
  const [allOptions, setAllOptions] = useState(false);
  const [termsOfServiceOptions, setTermsOfServiceOptions] = useState(false);
  const [personalInformation, setPersonalInformation] = useState(false);
  const [marketingInformation, setMarketingInformation] = useState(false);

  const termsOfUseContents = [
    {
      content: '서비스 이용약관 동의(필수)',
      router: '/mypage/etc/terms-agreement',
      state: termsOfServiceOptions,
      setState: setTermsOfServiceOptions,
    },
    {
      content: '개인 정보 수집 및 이용 동의(필수)',
      router: '/mypage/etc/personal-Info',
      state: personalInformation,
      setState: setPersonalInformation,
    },
    {
      content: '마케팅 정보 수신 동의(선택)',
      router: '/mypage/etc/marketing-Info',
      state: marketingInformation,
      setState: setMarketingInformation,
    },
  ];

  // 개별 상태가 하나라도 false이면 allOptions를 false로 설정
  useEffect(() => {
    if (termsOfServiceOptions && personalInformation && marketingInformation) {
      setAllOptions(true); // 모두 true일 경우 allOptions도 true
    } else {
      setAllOptions(false); // 하나라도 false면 allOptions는 false
    }
  }, [termsOfServiceOptions, personalInformation, marketingInformation]);

  const handleAllOptionsClick = () => {
    const newAllOptions = !allOptions;
    setAllOptions(newAllOptions);
    setTermsOfServiceOptions(newAllOptions);
    setPersonalInformation(newAllOptions);
    setMarketingInformation(newAllOptions);
  };

  const handleIndividualOptionClick = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    currentState: boolean,
  ) => {
    setState(!currentState);
  };

  return (
    <>
      <Header headerType={'dynamic'} title={'이용약관 동의'} onBack={onBefore} />
      <div className={'h-[100px]'} />
      <section className={'px-4 pt-[24px]'}>
        <h1 className={'head1'}>약관 동의가 필요해요.</h1>
        <p className={'body1 text-gray4 mt-1'}>
          Cercat 서비스 시작을 위해 <br />
          먼저 정보제공 및 필수약관에 동의 해주세요.
        </p>

        <section className={'mt-[32px] flex flex-col gap-y-4'}>
          <button
            onClick={() => {
              handleAllOptionsClick();
            }}
            className={
              allOptions
                ? 'flex justify-between p-2 rounded-full bg-primary w-full'
                : 'flex justify-between p-2 rounded-full bg-gray0 w-full'
            }>
            <div className={'flex gap-x-3 items-center'}>
              <div className={'flex items-center justify-center w-[48px] h-[48px] bg-white rounded-full'}>
                <Image
                  src={allOptions ? '/onboarding/CheckIcon.svg' : '/onboarding/UnCheckIcon.svg'}
                  width={32}
                  alt={'체크'}
                  height={32}
                />
              </div>
              <p className={allOptions ? 'text-white title5' : 'text-black title5'}>
                {allOptions ? '전체해제' : '전체동의'}
              </p>
            </div>
          </button>
          {termsOfUseContents.map((termsOfUseContent) => {
            return (
              <button
                onClick={() => {
                  termsOfUseContent.setState(!termsOfUseContent.state);
                }}
                key={termsOfUseContent.content}
                className={
                  termsOfUseContent.state
                    ? 'flex justify-between p-2 rounded-full bg-gray0 w-full border border-primary'
                    : 'flex justify-between p-2 rounded-full bg-gray0 w-full'
                }>
                <div className={'flex gap-x-3 items-center'}>
                  <div className={'flex items-center justify-center w-[48px] h-[48px] bg-white rounded-full'}>
                    <Image
                      src={termsOfUseContent.state ? '/onboarding/CheckIcon.svg' : '/onboarding/UnCheckIcon.svg'}
                      width={32}
                      alt={'체크'}
                      height={32}
                    />
                  </div>
                  <p className={'subtitle1'}>{termsOfUseContent.content}</p>
                </div>
                <Image
                  onClick={(event) => {
                    event.stopPropagation();
                    router.push(termsOfUseContent.router);
                  }}
                  src={'/onboarding/ArrowIcon.svg'}
                  width={32}
                  alt={'화살표'}
                  height={32}
                />
              </button>
            );
          })}
        </section>
      </section>
      <button
        onClick={() => {
          onNext();
        }}
        disabled={!(termsOfServiceOptions && personalInformation)}
        type={'submit'}
        className={
          !(termsOfServiceOptions && personalInformation)
            ? 'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
            : 'w-full bg-primary h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
        }>
        <div className="text-white text-h3 py-[25px]">동의</div>
      </button>
    </>
  );
};
export default TermsAgreement;
