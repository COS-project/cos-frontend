'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { certificationsListState } from '@/recoil/atom';
import { interestCertificatesState } from '@/recoil/onboarding/atom';

export interface Props {
  className?: string;
  isClickState?: boolean;
  certificateId: number;
  certificateName: string;
  icon?: JSX.Element; //TODO: svg 변경예정
  children?: React.ReactNode;
  isMoveButton?: boolean;
  path?: string;
}

const CertificationClassificationItem = (props: Props) => {
  const { className, isClickState, certificateId, certificateName, icon, children, isMoveButton = false, path } = props;
  const router = useRouter();
  const [allCertifications, setAllCertifications] = useRecoilState(certificationsListState);
  const [interestCertificates, setInterestCertificates] = useRecoilState(interestCertificatesState);

  //CertificationClassificationItem 컴포넌트의 이동버튼 클릭했을 때 함수
  const onClickMoveButton = () => {
    router.push(`community/${path}`);
  };

  const handleCertificationClick = (certificateId: number) => {
    setAllCertifications((currentCertifications) =>
      currentCertifications.map((certification) => {
        // interestCertificates의 길이를 기반으로 isClick 상태를 조건적으로 업데이트
        const shouldUpdateClickState = interestCertificates.length < 3 || certification.isClick;
        return certification.certificateId === certificateId && shouldUpdateClickState
          ? { ...certification, isClick: !certification.isClick }
          : certification;
      }),
    );
  };

  const createInterestCertification = () => {
    if (interestCertificates.some((item) => item.certificateId === certificateId)) {
      setInterestCertificates(
        interestCertificates.filter((interestCertificate) => interestCertificate.certificateId !== certificateId),
      );
    } else if (interestCertificates.length < 3) {
      setInterestCertificates((interestCertificates) => [
        ...interestCertificates,
        { certificateId: certificateId, certificateName: certificateName, interestPriority: 'LOW' },
      ]);
    } else {
      //TODO:모달창 디자인되면 변경
      alert('리스트에 값 3개만 넣어야함');
    }
  };

  return (
    <button className={twMerge('certificationItem-not-clicked', isClickState && 'certificationItem-click')}>
      <div className="relative flex items-center gap-x-3 p-2">
        <div
          onClick={() => {
            createInterestCertification();
            handleCertificationClick(certificateId);
          }}
          className="left-2 w-12 h-12 rounded-full bg-white">
          {icon}
        </div>
        <div className="text-h4 font-semibold">{children}</div>
        <div className="absolute right-4" onClick={onClickMoveButton}>
          {isMoveButton ? <MoveButtonIcon /> : null}
        </div>
      </div>
    </button>
  );
};

export default CertificationClassificationItem;

function MoveButtonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.14572 5.5L13.1457 10.5L8.14572 15.5"
        stroke="#0D0E10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
