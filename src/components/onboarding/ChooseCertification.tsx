'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import CertificationClassificationItem from '@/components/onboarding/CertificationClassificationItem';
import DoneButton from '@/components/onboarding/DoneButton';

export interface ChooseCertificationProps {
  onNext?: () => void;
  onBefore?: () => void;
}

const ChooseCertification: React.FC<ChooseCertificationProps> = ({ onNext, onBefore }) => {
  const router = useRouter();

  // 완료 버튼이 눌리면 primary 컬러로 바뀌도록 하는 state
  const [isClick, setIsClick] = useState<boolean>(false);

  // CertificationClassificationItem 컴포넌트 눌렀는지 안눌렀는지 체크하는 State
  // TODO: 백엔드에서 true, false로 받으면 같이 누르는거 해결할 예정.
  const [isCheck, setIsCheck] = useState<boolean>(false);

  // CertificationClassificationItem 컴포넌트 클릭했는지 안했는지 판별하는 함수
  const onClick = () => {
    setIsCheck(!isCheck);
  };

  // CertificationClassificationItem 컴포넌트가 클릭됐을 때, 안됐을 때 스타일링
  const chooseClassificationItemClassName = (isCheck: boolean) => {
    let CHOOSE_CERTIFICATE_STYLE;
    if (isCheck) {
      CHOOSE_CERTIFICATE_STYLE = 'w-full h-16 bg-gray0 rounded-full border-[1px] border-second';
    } else {
      CHOOSE_CERTIFICATE_STYLE = 'w-full h-16 bg-gray0 rounded-full';
    }
    return CHOOSE_CERTIFICATE_STYLE;
  };

  // CertificationClassificationItem 컴포넌트가 클릭됐을 때, 안됐을 때 아이콘바꾸는 함수
  //TODO: SVG 파일로 변경될 예정
  const chooseClassificationItemIcon = (isCheck: boolean) => {
    let CHOOSE_CERTIFICATE_ICON;
    if (isCheck) {
      CHOOSE_CERTIFICATE_ICON = (
        <div className="p-2">
          <CheckIcon />
        </div>
      );
    } else {
      CHOOSE_CERTIFICATE_ICON = (
        <div className="p-2">
          <UnCheckIcon />
        </div>
      );
    }
    return CHOOSE_CERTIFICATE_ICON;
  };

  return (
    <div>
      {/* TODO: Header */}
      <div className="flex justify-between">
        <button onClick={onBefore}>이전</button>
      </div>

      {/* 온보딩 멘트 */}
      <div className="grid gap-y-8 m-4">
        <div className="grid">
          <span className="text-h1 font-bold">
            학습하고자 하는 <br /> 자격증을 선택해주세요!
          </span>
          <span className="text-h5 text-gray4">마이페이지에서 다시 선택할 수 있어요.</span>
        </div>

        {/* 자격증 종류 나열 */}
        {/* 백엔드 API 나오면 map 코드로 바꿀 예정 */}
        <div className="grid gap-y-4">
          <CertificationClassificationItem
            className={chooseClassificationItemClassName(isCheck)}
            onClickItem={onClick}
            icon={chooseClassificationItemIcon(isCheck)}>
            컴퓨터활용능력시험 1급
          </CertificationClassificationItem>
          <CertificationClassificationItem
            className={chooseClassificationItemClassName(isCheck)}
            onClickItem={onClick}
            icon={chooseClassificationItemIcon(isCheck)}>
            컴퓨터활용능력시험 2급
          </CertificationClassificationItem>
          <CertificationClassificationItem
            className={chooseClassificationItemClassName(isCheck)}
            onClickItem={onClick}
            icon={chooseClassificationItemIcon(isCheck)}>
            정보처리기사
          </CertificationClassificationItem>
          <CertificationClassificationItem
            className={chooseClassificationItemClassName(isCheck)}
            onClickItem={onClick}
            icon={chooseClassificationItemIcon(isCheck)}>
            사회조사분석사
          </CertificationClassificationItem>
        </div>
      </div>

      {/* 완료 버튼 */}
      <DoneButton onClick={onNext} isClick={isClick}>
        완료
      </DoneButton>
    </div>
  );
};
export default ChooseCertification;
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6957 21.4069L24.6744 9.41119C24.7836 9.31432 24.9148 9.26162 25.0678 9.25309C25.2209 9.24453 25.3601 9.29762 25.4855 9.41235C25.5994 9.53849 25.6564 9.67652 25.6564 9.82645C25.6564 9.97639 25.5994 10.1083 25.4855 10.2223L13.3795 22.3283C13.1858 22.522 12.9578 22.6189 12.6957 22.6189C12.4336 22.6189 12.2057 22.522 12.012 22.3283L6.5094 16.8257C6.40113 16.7165 6.34401 16.5853 6.33803 16.4323C6.33206 16.2792 6.39213 16.14 6.51827 16.0146C6.6444 15.9007 6.77958 15.8437 6.9238 15.8437C7.06804 15.8437 7.20284 15.9007 7.3282 16.0146L12.6957 21.4069Z"
        fill="#3B3DFF"
      />
    </svg>
  );
}

function UnCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6957 21.4069L24.6744 9.41119C24.7836 9.31432 24.9148 9.26162 25.0678 9.25309C25.2209 9.24453 25.3601 9.29762 25.4855 9.41235C25.5994 9.53849 25.6564 9.67652 25.6564 9.82645C25.6564 9.97639 25.5994 10.1083 25.4855 10.2223L13.3795 22.3283C13.1858 22.522 12.9578 22.6189 12.6957 22.6189C12.4336 22.6189 12.2057 22.522 12.012 22.3283L6.5094 16.8257C6.40113 16.7165 6.34401 16.5853 6.33803 16.4323C6.33206 16.2792 6.39213 16.14 6.51827 16.0146C6.6444 15.9007 6.77958 15.8437 6.9238 15.8437C7.06804 15.8437 7.20284 15.9007 7.3282 16.0146L12.6957 21.4069Z"
        fill="#9E9FA1"
      />
    </svg>
  );
}
