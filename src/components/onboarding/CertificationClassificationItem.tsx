'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import { postFavoriteBoards } from '@/lib/api/community';
import useGetBoardList from '@/lib/hooks/useGetBoardList';
import { certificationsListState } from '@/recoil/atom';
import { boardTypeInitAtom, boardTypeStateAtom } from '@/recoil/community/atom';
import { interestCertificatesState } from '@/recoil/onboarding/atom';
import { BoardType } from '@/types/community/type';

export interface Props {
  usage: string;
  className?: string;
  isClickState?: boolean;
  certificateId: number;
  certificateName: string;
  icon?: JSX.Element; //TODO: svg 변경예정
  children?: React.ReactNode;
  isMoveButton?: boolean;
  path?: number;
  isErrorModalOpen?: boolean;
  setIsErrorModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CertificationClassificationItem = (props: Props) => {
  const {
    isClickState,
    usage,
    certificateId,
    certificateName,
    icon,
    children,
    isMoveButton = false,
    path,
    className,
    isErrorModalOpen,
    setIsErrorModalOpen,
  } = props;
  const router = useRouter();
  const [allCertifications, setAllCertifications] = useRecoilState(certificationsListState);
  const [interestCertificates, setInterestCertificates] = useRecoilState(interestCertificatesState);
  const { mutate } = useGetBoardList();

  //CertificationClassificationItem 컴포넌트의 이동버튼 클릭했을 때 함수
  const onClickMoveButton = () => {
    router.push(`community/${path}`);
  };

  //온보딩 아이템을 클릭하면 isClick이 변경되도록하는 함수
  const handleCertificationClick = (certificateId: number) => {
    setAllCertifications((currentCertifications) =>
      currentCertifications.map((certification) => {
        // interestCertificates의 길이를 기반으로 isClick 상태를 조건적으로 업데이트
        const shouldUpdateClickState = interestCertificates.interestTargetList.length < 3 || certification.isClick;
        return certification.certificateId === certificateId && shouldUpdateClickState
          ? { ...certification, isClick: !certification.isClick }
          : certification;
      }),
    );
  };

  //온보딩 관심 자격증 리스트 만드는 함수
  const createInterestCertification = () => {
    if (interestCertificates.interestTargetList.some((item) => item.certificateId === certificateId)) {
      setInterestCertificates(() => ({
        interestTargetList: interestCertificates.interestTargetList.filter(
          (interestCertificate) => interestCertificate.certificateId !== certificateId,
        ),
      }));
    } else if (interestCertificates.interestTargetList.length < 3) {
      setInterestCertificates((interestCertificates) => ({
        interestTargetList: [
          ...interestCertificates.interestTargetList,
          { certificateId: certificateId, certificateName: certificateName, interestPriority: 'LOW' },
        ],
      }));
    } else {
      if (setIsErrorModalOpen) {
        setIsErrorModalOpen(!isErrorModalOpen);
      }
    }
  };

  //게시판 아이템을 클릭하면 post 요청이 보내지는 함수
  const onClickCertification = async (certificateId: number) => {
    // POST 요청을 통해 즐겨찾기 상태 업데이트
    await postFavoriteBoards(certificateId).then(() => {
      mutate();
    });
    // /boards 경로에 대한 데이터를 새로고침하여 최신 상태 반영
  };

  return (
    <button
      onClick={() => {
        if (usage === 'onboarding') {
          createInterestCertification();
          handleCertificationClick(certificateId);
        } else {
          onClickMoveButton();
        }
      }}
      className={twMerge('certificationItem-not-clicked', isClickState && className)}>
      <div className="relative flex items-center gap-x-3 p-2">
        <div
          onClick={(e) => {
            if (usage === 'board') {
              e.stopPropagation(); // ✅ 이벤트 전파 막기
              onClickCertification(certificateId);
            }
          }}
          className="left-2 w-12 h-12 rounded-full bg-white">
          {icon}
        </div>
        <div className="text-h4 font-semibold">{children}</div>
        <div className="absolute right-4">{isMoveButton ? <MoveButtonIcon /> : null}</div>
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
