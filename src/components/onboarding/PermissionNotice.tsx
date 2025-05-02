import Image from 'next/image';
import { useState } from 'react';

import Header from '@/components/common/Header';

interface Props {
  onNext: () => void;
  onBefore: () => void;
}
const PermissionNotice = (props: Props) => {
  const { onNext, onBefore } = props;
  const [alarmChecked, setAlarmChecked] = useState(true);
  const [cameraChecked, setCameraChecked] = useState(true);

  const permissionItemsData = [
    {
      src: '/onboarding/PhotoCamera.svg',
      alt: '카메라',
      title: '사진 / 카메라',
      description: '사진 업로드 및 저장 기능',
      state: cameraChecked,
      setState: setCameraChecked,
    },
    {
      src: '/onboarding/Alarm.svg',
      alt: '알람',
      title: '알림',
      description: '푸시 알림 및 메시지 수신 안내',
      state: alarmChecked,
      setState: setAlarmChecked,
    },
  ];

  return (
    <>
      <Header headerType={'dynamic'} title={'서비스 권한'} onBack={onBefore} />
      <div className={'h-[100px]'} />
      <section className={'px-4 pt-[24px]'}>
        <h1 className={'head1'}>서비스 접근 권한 안내</h1>
        <p className={'body1 text-gray4 mt-1'}>
          Cercat 서비스를 이용하기 위해 <br />
          다음과 같은 권한이 필요해요
        </p>

        <section className={'mt-[32px] flex flex-col gap-y-4'}>
          {permissionItemsData.map((permissionItem) => {
            return (
              <button key={permissionItem.title} className={'flex justify-between p-2 rounded-full bg-gray0 w-full'}>
                <div className={'flex gap-x-3 items-center'}>
                  <div className={'flex items-center justify-center w-[48px] h-[48px] bg-white rounded-full'}>
                    <Image src={permissionItem.src} width={40} alt={permissionItem.alt} height={40} />
                  </div>
                  <div className={'flex flex-col items-start'}>
                    <p className={'text-black title5 leading-[24px]'}>{permissionItem.title}</p>
                    <p className={'text-gray4 body2 leading-[24px]'}>{permissionItem.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </section>
      <button
        onClick={() => {
          onNext();
        }}
        disabled={!(alarmChecked && cameraChecked)}
        type={'submit'}
        className={
          !(alarmChecked && cameraChecked)
            ? 'w-full bg-gray2 h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
            : 'w-full bg-primary h-[100px] rounded-t-[32px] text-white text-h3 fixed bottom-0'
        }>
        <div className="text-white text-h3 py-[25px]">다음</div>
      </button>
    </>
  );
};
export default PermissionNotice;
