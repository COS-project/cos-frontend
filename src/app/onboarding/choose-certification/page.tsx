'use client';
import CertificationClassificationItem from '@/app/(main)/mypage/components/CertificationClassificationItem';
import { useRouter } from 'next/navigation';
import DoneButton from '@/app/(main)/mypage/components/DoneButton';
import { useState } from 'react';

const ChooseCertification = () => {
  const router = useRouter();

  //완료 버튼이 눌리면 primary컬러로 바뀌도록 하는 state
  const [isClick, setIsClick] = useState(false);

  //완료버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onAfterClick = () => {
    setIsClick(!isClick);
    router.push('/onboarding/certification-priority');
  };
  //이전버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onBeforeClick = () => {
    router.push('/');
  };

  return (
    <div>
      {/* TODO: Header */}
      <div className="flex justify-between">
        <button onClick={onBeforeClick}>이전</button>
      </div>
      {/* 온보딩 멘트 */}
      <div className="grid gap-y-8 m-4">

        <div className="grid">
          <span className="text-h1 font-bold">학습하고자 하는 <br/> 자격증을 선택해주세요!</span>
          <span className="text-h5 text-gray4">마이페이지에서 다시 선택할 수 있어요.</span>
        </div>

        {/* 자격증 종류 나열 */}
        <div className="grid gap-y-4">
          <CertificationClassificationItem >
            컴퓨터활용능력시험 1급
          </CertificationClassificationItem>
          <CertificationClassificationItem >
            컴퓨터활용능력시험 2급
          </CertificationClassificationItem>
          <CertificationClassificationItem >
            정보처리기사
          </CertificationClassificationItem>
          <CertificationClassificationItem >
            사회조사분석사
          </CertificationClassificationItem>
        </div>
      </div>

      {/* 완료 버튼 */}
      <DoneButton onClick={onAfterClick} isClick={isClick}>
        완료
      </DoneButton>
    </div>
  );
};
export default ChooseCertification;
