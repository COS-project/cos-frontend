'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SVGProps } from 'react';
import { useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import CommentWriting from '@/components/community/CommentWriting';
import CommunityComments from '@/components/community/CommunityComments';
import CommunityPost from '@/components/community/CommunityPost';
import Profile from '@/components/community/Profile';
import Question from '@/components/community/Question';
import useGetCommunityPost from '@/lib/hooks/useGetCommunityPost';
import { certificateIdAtom } from '@/recoil/atom';
import { BoardType } from '@/types/community/type';
import { formatDateTime } from '@/utils/community/function';
import PostOptionModal from '@/components/community/PostOptionModal';
import EditPost from '@/components/community/EditPost';

const CommunityDetailPage = () => {
  const params = useParams();
  const certificateId = useRecoilValue(certificateIdAtom);
  //커뮤니티 포스트에 해당하는 데이터를 가져옴
  const { communityPostData, isLoading, isError, communityPostDataMutate } = useGetCommunityPost(params.id);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isPostOptionModalOpen, setPostIsOptionModalOpen] = useState(true);
  const [isCommentOptionModalOpen, setCommentIsOptionModalOpen] = useState(true);
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [isClickEditPost, setIsClickEditPost] = useState(false);

  useEffect(() => {
    console.log('params', params);
  }, [params]);

  if (!communityPostData) {
    return <Spinner />;
  }

  const postData = communityPostData.postResponse;
  const commentList = communityPostData?.postComments;

  const switchBoardType = (boardType: BoardType) => {
    switch (boardType) {
      case 'COMMENTARY':
        return '해설 게시판';
      case 'TIP':
        return '꿀팁 게시판';
      default:
        return '자유 게시판';
    }
  };

  const switchTopElementByBoardType = (boardType: BoardType) => {
    switch (boardType) {
      case 'COMMENTARY':
        return (
          <div className={'flex justify-between items-center'}>
            <div className={'flex gap-x-2'}>
              <div className={'rounded-[8px] py-[2px] px-2 bg-gray0 h-fit'}>
                <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-gray4'}>
                  {postData.question?.mockExam.examYear}년도
                </p>
              </div>
              <div className={'rounded-[8px] py-[2px] px-2 bg-gray0 h-fit'}>
                <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-gray4'}>
                  {postData.question?.mockExam.round}회차
                </p>
              </div>
              <div className={'rounded-[8px] py-[2px] px-2 bg-gray0 h-fit'}>
                <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-gray4'}>
                  {postData.question?.questionSeq}번
                </p>
              </div>
            </div>
            <button
              type={'button'}
              className={'flex items-center rounded-full border border-gray2 py-1 px-3'}
              onClick={() => {
                setIsQuestionModalOpen(!isQuestionModalOpen);
              }}>
              <p className={'font-pre text-h6 font-medium leading-[21px] tracking-[-0.28px] text-gray4'}>문제 보기</p>
              <Image
                src="/community/GrayArrowIcon.svg"
                alt="GrayArrowIcon"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
            </button>
          </div>
        );
      case 'TIP':
        return '꿀팁 게시판';
      default:
        return '자유 게시판';
    }
  };

  return (
    <>
      {isPostOptionModalOpen && (
        <PostOptionModal
          communityId={params.category}
          postId={postData.postId}
          setPostIsOptionModal={setPostIsOptionModalOpen}
          setIsClickEditPost={setIsClickEditPost}
        />
      )}
      {isQuestionModalOpen && (
        <Question
          isQuestionModalOpen={isQuestionModalOpen}
          setIsQuestionModalOpen={setIsQuestionModalOpen}
          examYear={postData.question?.mockExam.examYear}
          questionSeq={postData.question?.questionSeq}
          examRound={postData.question?.mockExam.round}
          content={postData.question?.questionText}
          questionOptions={postData.question?.questionOptions}
          correctOption={postData.question?.correctOption}
        />
      )}
      {isClickEditPost ? (
        <EditPost
          postId={params.id}
          mockExamId={postData.question?.mockExam.mockExamId}
          setIsClickEditPost={setIsClickEditPost}
        />
      ) : postData ? (
        <main>
          <Header headerType={'dynamic'} title={switchBoardType(postData.postType)} />
          {/* 게시글 */}
          <section className={'px-5 mt-[20px]'}>
            <Profile
              setIsOptionModalOpen={() => {
                setPostIsOptionModalOpen(true);
              }}
              profileUrl={postData.user.profileImage}
              isWriter={true}
              createdTime={postData.dateTime.createdAt}
              nickName={postData.user.nickname}
            />
            <CommunityPost
              postId={postData.postId}
              likeCount={postData.likeCount}
              likeStatus={postData.likeStatus}
              commentCount={postData.commentCount}
              imageList={postData.postImages}
              title={postData.postContent.title}
              content={postData.postContent.content}>
              <div>{switchTopElementByBoardType(postData.postType)}</div>
            </CommunityPost>
            <CommunityComments
              postId={postData.postId}
              commentList={commentList}
              setCommentIsOptionModalOpen={setCommentIsOptionModalOpen}
              setSelectedCommentId={setSelectedCommentId}
            />
          </section>
          <div className={'h-[100px]'} />
        </main>
      ) : (
        <></>
      )}
      <CommentWriting postId={postData.postId} communityPostDataMutate={communityPostDataMutate} />
    </>
  );
};
export default CommunityDetailPage;
