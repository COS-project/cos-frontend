'use client';

import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import MyPageCommentaryBoardList from '@/components/mypage/MyPageCommentaryBoardList';
import MyPageExamReviewBoardList from '@/components/mypage/MyPageExamReviewBoardList';
import MyPageNormalAndTipBoardList from '@/components/mypage/MyPageNormalAndTipBoardList';
import MyWritingMenu from '@/components/mypage/MyWritingMenu';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { BoardType } from '@/types/community/type';
import DeleteWarningModal from '@/components/mypage/DeleteWarningModal';

export default function MyWriting() {
  // REVIEW, COMMENTARY, TIP, NORMAL
  const [boardType, setBoardType] = useState<BoardType>('REVIEW');
  const [isDeleteWarningModalOpen, setIsDeleteWarningModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState(0);
  return (
    <>
      {isDeleteWarningModalOpen ? (
        <DeleteWarningModal
          boardType={boardType}
          deletePostId={deletePostId}
          isDeleteWarningModalOpen={isDeleteWarningModalOpen}
          setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
        />
      ) : null}
      <Header headerType={'dynamic'} title={'내가 작성한 글'} rightElement={<EmptyIcon />} />
      <MyWritingMenu boardType={boardType} setBoardType={setBoardType} />
      <div className={'flex flex-col gap-y-4 bg-gray0 min-h-screen p-5'}>
        {/*post*/}
        {boardType === 'REVIEW' ? (
          <MyPageExamReviewBoardList
            setDeletePostId={setDeletePostId}
            isDeleteWarningModalOpen={isDeleteWarningModalOpen}
            setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
            boardType={boardType}
          />
        ) : boardType === 'COMMENTARY' ? (
          <MyPageCommentaryBoardList
            setDeletePostId={setDeletePostId}
            isDeleteWarningModalOpen={isDeleteWarningModalOpen}
            setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
            boardType={boardType}
          />
        ) : boardType === 'TIP' ? (
          <MyPageNormalAndTipBoardList
            setDeletePostId={setDeletePostId}
            isDeleteWarningModalOpen={isDeleteWarningModalOpen}
            setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
            boardType={boardType}
          />
        ) : boardType === 'NORMAL' ? (
          <MyPageNormalAndTipBoardList
            setDeletePostId={setDeletePostId}
            isDeleteWarningModalOpen={isDeleteWarningModalOpen}
            setIsDeleteWarningModalOpen={setIsDeleteWarningModalOpen}
            boardType={boardType}
          />
        ) : null}
      </div>
      <NavBar />
    </>
  );
}
const DisableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M13.5 9 10 12 6.5 9" />
  </svg>
);
const ActivationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path stroke="#727375" strokeLinecap="round" d="M6.5 12 10 9l3.5 3" />
  </svg>
);

const EmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m26.11 26.867-8.474-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.19 0-5.402-2.206-2.211-2.207-2.211-5.384T7.283 7.23q2.207-2.21 5.383-2.21t5.397 2.207q2.22 2.208 2.22 5.385 0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.48 8.45zm-13.424-7.785q2.721 0 4.595-1.87 1.875-1.869 1.875-4.597 0-2.727-1.875-4.597t-4.595-1.87q-2.726 0-4.604 1.87-1.877 1.871-1.877 4.597 0 2.728 1.877 4.597t4.603 1.87"
      />
    </g>
  </svg>
);
