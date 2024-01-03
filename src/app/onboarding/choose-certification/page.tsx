'use client';
import CertificationClassificationItem from '@/app/(main)/mypage/components/CertificationClassificationItem';
import { useRouter } from 'next/navigation';
import DoneButton from '@/app/(main)/mypage/components/DoneButton';
import { useEffect, useState } from 'react';

const ChooseCertification = () => {
  const router = useRouter();

  // 완료 버튼이 눌리면 primary 컬러로 바뀌도록 하는 state
  const [isClick, setIsClick] = useState(false);

  // CertificationClassificationItem 컴포넌트 눌렀는지 안눌렀는지 체크하는 State
  // TODO: 백엔드에서 true, false로 받으면 같이 누르는거 해결할 예정.
  const [isCheck, setIsCheck] = useState<boolean>(false);

  //완료버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onAfterClick = () => {
    setIsClick(!isClick);
    router.push('/onboarding/certification-priority');
  };

  // 이전버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onBeforeClick = () => {
    router.push('/');
  };

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
      CHOOSE_CERTIFICATE_ICON = '✅';
    } else {
      CHOOSE_CERTIFICATE_ICON = '✔️';
    }
    return CHOOSE_CERTIFICATE_ICON;
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
      <DoneButton onClick={onAfterClick} isClick={isClick}>
        완료
      </DoneButton>
    </div>
  );
};
export default ChooseCertification;
