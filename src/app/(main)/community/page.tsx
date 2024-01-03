'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import CertificationClassificationItem from '@/app/(main)/mypage/components/CertificationClassificationItem';

export default function Community() {
  // CertificationClassificationItem 컴포넌트의 className
  const CERTIFICATION_ITEM_STYLE = 'w-full h-16 bg-gray0 rounded-full';
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const router = useRouter();

  // CertificationClassificationItem 컴포넌트가 클릭하면 true, 클릭되지 않으면 false로 바꿔주는 함수
  const onClick = () => {
    setIsCheck(!isCheck);
  };

  // CertificationClassificationItem 컴포넌트가 클릭됐을 때, 안됐을 때 아이콘
  // TODO: SVG로 변경될 예정
  const chooseClassificationItemIcon = (isCheck: boolean) => {
    let CHOOSE_CERTIFICATE_ICON;
    if (isCheck) {
      CHOOSE_CERTIFICATE_ICON = '📌';
    } else {
      CHOOSE_CERTIFICATE_ICON = '';
    }
    return CHOOSE_CERTIFICATE_ICON;
  };

  //CertificationClassificationItem 컴포넌트의 이동버튼 클릭했을 때 함수
  const onClickMoveButton = () => {
    router.push('/board/1');
  };

  return (
    <div className="grid gap-y-8 m-5 mt-6">
      <div className="grid gap-y-2">
        <div className="text-primary text-h4">게시판</div>
        <div className="text-black text-h1 font-bold">어떤 자격증 정보와 <br/> 소식이 궁금하신가요?</div>
      </div>

      {/* 자격증 선택 */}
      {/* 백엔드 API 나오면 map 코드로 바꿀 예정 */}
      <div className="grid gap-y-4">
        <CertificationClassificationItem
          className={CERTIFICATION_ITEM_STYLE}
          onClickItem={onClick}
          icon={chooseClassificationItemIcon(isCheck)}
          isMoveButton={true}
          onClickMoveButton={onClickMoveButton}>
          컴퓨터활용능력 1급 게시판
        </CertificationClassificationItem>
        <CertificationClassificationItem
          className={CERTIFICATION_ITEM_STYLE}
          onClickItem={onClick}
          icon={chooseClassificationItemIcon(isCheck)}>
          컴퓨터활용능력 2급 게시판
        </CertificationClassificationItem>
        <CertificationClassificationItem
          className={CERTIFICATION_ITEM_STYLE}
          onClickItem={onClick}
          icon={chooseClassificationItemIcon(isCheck)}>
          정보처리기사 게시판
        </CertificationClassificationItem>
        <CertificationClassificationItem
          className={CERTIFICATION_ITEM_STYLE}
          onClickItem={onClick}
          icon={chooseClassificationItemIcon(isCheck)}>
          사회조사분석사 게시판
        </CertificationClassificationItem>
      </div>
    </div>
  );
}
