import Cookies from 'js-cookie';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Profile from '@/components/community/Profile';
import { deleteToggleLikeData, postToggleLikeData } from '@/lib/api/communityPost';
import { GenerateCommentState, selectedReplyParentNameAtom } from '@/recoil/community/atom';
import { PostComments } from '@/types/global';

interface Props {
  commentList: PostComments[];
  setCommentIsOptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCommentId: React.Dispatch<React.SetStateAction<number>>;
}
const CommunityComments = (props: Props) => {
  const userId = Cookies.get('userId');
  const { commentList, setCommentIsOptionModalOpen, setSelectedCommentId } = props;
  const [localCommentList, setLocalCommentList] = useState<PostComments[]>([]);
  const [generateComment, setGenerateComment] = useRecoilState(GenerateCommentState);
  const setSelectedReplyParentName = useSetRecoilState(selectedReplyParentNameAtom);

  useEffect(() => {
    setLocalCommentList(commentList);
  }, [commentList]);

  const handleLikeClick = (commentId: number, childCommentId?: number) => {
    setLocalCommentList((prev) =>
      prev.map((comment) => {
        // 대댓글 처리
        if (childCommentId) {
          if (comment.postCommentId !== commentId) return comment;
          const updatedChildren = comment.childPostComments?.map((child) => {
            if (child.postCommentId === childCommentId) {
              const isLiked = child.likeStatus;
              return {
                ...child,
                likeCount: isLiked ? child.likeCount - 1 : child.likeCount + 1,
                likeStatus: !isLiked,
              };
            }
            return child;
          });
          return { ...comment, childPostComments: updatedChildren };
        }

        // 댓글 처리
        if (comment.postCommentId === commentId) {
          const isLiked = comment.likeStatus;
          return {
            ...comment,
            likeCount: isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
            likeStatus: !isLiked,
          };
        }

        return comment;
      }),
    );
  };

  return (
    <div className={'flex flex-col py-4'}>
      {localCommentList.map((comment) => {
        return (
          <div key={comment.parentCommentId} className={'flex flex-col gap-y-5 py-4 border-b border-gray0'}>
            {/* 댓글 */}
            <section className={'flex flex-col gap-y-2'}>
              <Profile
                nickName={comment.user.nickname}
                profileUrl={comment.user.profileImage}
                createdTime={comment.dateTime.createdAt}
                isWriter={parseInt(userId as string) === comment.user.userId}
                setIsOptionModalOpen={() => {
                  setCommentIsOptionModalOpen(true);
                  setSelectedCommentId(comment.postCommentId);
                }}
              />
              <section className={'pl-[48px]'}>
                <div className={'flex justify-between'}>
                  <div className={'flex flex-col gap-y-2 items-start w-[85%]'}>
                    <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-black'}>
                      {comment.content}
                    </p>
                    <button
                      onClick={() => {
                        setGenerateComment({ ...generateComment, parentCommentId: comment.postCommentId });
                        setSelectedReplyParentName(comment.user.nickname);
                      }}
                      className={
                        generateComment.parentCommentId === comment.postCommentId
                          ? 'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-primary'
                          : 'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-gray4'
                      }>
                      답글 달기
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (comment.likeStatus) {
                        deleteToggleLikeData(comment.postCommentId, 'COMMENT').then(() => {
                          console.log('좋아요 삭제');
                        });
                      } else {
                        postToggleLikeData(comment.postCommentId, 'COMMENT').then(() => {
                          console.log('좋아요 추가');
                        });
                      }
                      handleLikeClick(comment.postCommentId);
                    }}
                    className={'flex flex-col items-center'}>
                    <Image
                      src={comment.likeStatus ? '/community/BlueLikeIcon.svg' : '/community/GrayLikeIcon.svg'}
                      alt="Logo"
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24 }}
                    />
                    <p className={'font-pre text-h7 font-normal leading-normal text-gray4'}>{comment.likeCount}</p>
                  </button>
                </div>
              </section>
            </section>
            {/* 대댓글 */}
            {comment.childPostComments && (
              <section className={'flex flex-col gap-y-3'}>
                {comment.childPostComments?.map((replyComment) => {
                  return (
                    <div key={replyComment.postCommentId} className={'pl-[48px] flex flex-col gap-y-2'}>
                      <Profile
                        nickName={replyComment.user.nickname}
                        profileUrl={replyComment.user.profileImage}
                        createdTime={replyComment.dateTime.createdAt}
                        isWriter={parseInt(userId as string) === replyComment.user.userId}
                        setIsOptionModalOpen={() => {
                          setCommentIsOptionModalOpen(true);
                          setSelectedCommentId(replyComment.postCommentId);
                        }}
                        nickNameClassName={'subtitle2 text-gray4 leading-[21px] tracking-[-0.28px]'}
                        imageClassName={'relative w-[36px] h-[36px]'}
                      />
                      <div className={'pl-[48px] flex justify-between'}>
                        <div className={'flex flex-col gap-y-2 items-start w-[85%]'}>
                          <p className={'font-pre text-h6 font-normal leading-[21px] tracking-[-0.28px] text-black'}>
                            {replyComment.content}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (replyComment.likeStatus) {
                              deleteToggleLikeData(replyComment.postCommentId, 'COMMENT').then(() => {
                                console.log('좋아요 삭제');
                              });
                            } else {
                              postToggleLikeData(replyComment.postCommentId, 'COMMENT').then(() => {
                                console.log('좋아요 추가');
                              });
                            }
                            handleLikeClick(comment.postCommentId, replyComment.postCommentId);
                          }}
                          className={'flex flex-col items-center'}>
                          <Image
                            src={
                              replyComment.likeStatus ? '/community/BlueLikeIcon.svg' : '/community/GrayLikeIcon.svg'
                            }
                            alt="Logo"
                            width={24}
                            height={24}
                            style={{ width: 24, height: 24 }}
                          />
                          <p className={'font-pre text-h7 font-normal leading-normal text-gray4'}>
                            {replyComment.likeCount}
                          </p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default CommunityComments;
