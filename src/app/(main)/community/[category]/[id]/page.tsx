'use client';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Header from '@/components/common/Header';
import Spinner from '@/components/common/Spinner';
import CommentOptionModal from '@/components/community/CommentOptionModal';
import CommentWriting from '@/components/community/CommentWriting';
import CommunityComments from '@/components/community/CommunityComments';
import CommunityPost from '@/components/community/CommunityPost';
import EditPost from '@/components/community/EditPost';
import PostOptionModal from '@/components/community/PostOptionModal';
import Profile from '@/components/community/Profile';
import Question from '@/components/community/Question';
import ReportSubmittedModal from '@/components/community/ReportSubmittedModal';
import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import useGetCommunityPost from '@/lib/hooks/useGetCommunityPost';
import { certificateIdAtom } from '@/recoil/atom';
import { BoardType } from '@/types/community/type';

const CommunityDetailPage = () => {
  const params = useParams();
  const certificateId = useRecoilValue(certificateIdAtom);
  const userId = Cookies.get('userId');
  //커뮤니티 포스트에 해당하는 데이터를 가져옴
  const { communityPostData, isLoading, isError, communityPostDataMutate } = useGetCommunityPost(params.id);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isPostOptionModalOpen, setPostIsOptionModalOpen] = useState(false);
  const [isCommentOptionModalOpen, setCommentIsOptionModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [isClickEditPost, setIsClickEditPost] = useState(false);
  const [isReportSubmittedModalOpen, setIsReportSubmittedModalOpen] = useState(false);
  const { bestTipPosts } = useBest3TipPosts(certificateId);
  const bestPostIds = bestTipPosts?.map((post) => post.postId);

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
        return (
          <div className={'flex justify-between'}>
            <div className={'flex gap-x-2'}>
              {postData.recommendTags?.map((tag) => {
                return (
                  <div key={tag.tagName} className={'rounded-[8px] py-[2px] px-2 bg-gray0 h-fit'}>
                    <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-gray4'}>
                      {tag.tagName}
                    </p>
                  </div>
                );
              })}
            </div>
            {bestPostIds?.includes(postData.postId) && (
              <div
                className={
                  'bg-primary text-white px-3 py-[2px] font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] rounded-full'
                }>
                BEST
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isReportSubmittedModalOpen && (
        <ReportSubmittedModal setIsReportSubmittedModalOpen={setIsReportSubmittedModalOpen} />
      )}
      {isCommentOptionModalOpen && (
        <CommentOptionModal
          commentId={selectedCommentId}
          setIsReportSubmittedModalOpen={setIsReportSubmittedModalOpen}
          setCommentIsOptionModal={setCommentIsOptionModalOpen}
          communityPostDataMutate={communityPostDataMutate}
        />
      )}
      {isPostOptionModalOpen && (
        <PostOptionModal
          communityId={params.category}
          postId={postData.postId}
          setPostIsOptionModal={setPostIsOptionModalOpen}
          setIsClickEditPost={setIsClickEditPost}
          setIsReportSubmittedModalOpen={setIsReportSubmittedModalOpen}
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
              isWriter={parseInt(userId as string) === postData.user.userId}
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
              commentList={commentList}
              setCommentIsOptionModalOpen={setCommentIsOptionModalOpen}
              setSelectedCommentId={setSelectedCommentId}
            />
          </section>
          <div className={'h-[100px]'} />
          <CommentWriting postId={postData.postId} communityPostDataMutate={communityPostDataMutate} />
        </main>
      ) : (
        <></>
      )}
    </>
  );
};
export default CommunityDetailPage;
