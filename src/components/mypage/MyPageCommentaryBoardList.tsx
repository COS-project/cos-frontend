import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Post from '@/components/mypage/Post';
import useGetUserPosts from '@/lib/hooks/useGetUserPosts';
import { BoardType, PostType, ResponsePostType } from '@/types/community/type';
import { MyPostsResponseType } from '@/types/mypage/type';

interface Props {
  boardType: BoardType;
  isDeleteWarningModalOpen: boolean;
  setIsDeleteWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletePostId: React.Dispatch<React.SetStateAction<number>>;
  selectedFilterContent: '최신순' | '작성순';
}
const MyPageCommentaryBoardList = (props: Props) => {
  const { boardType, isDeleteWarningModalOpen, setIsDeleteWarningModalOpen, setDeletePostId, selectedFilterContent } =
    props;
  const [ref, inView] = useInView();
  const { userPostsList, setSize } = useGetUserPosts(boardType, selectedFilterContent == '최신순' ? 'ASC' : 'DESC');
  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPostsList) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, []);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  const commentaryTopElement = (year: number, round: number, number: number) => {
    return (
      <div className={'flex gap-x-[6px] pb-3'}>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{year}년도</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{round}회차</div>
        <div className={'px-2 py-[2px] text-gray4 bg-gray0 rounded-[8px]'}>{number}번</div>
      </div>
    );
  };

  const bottomElement = (postId: number) => {
    return (
      <div className={'flex justify-end gap-x-2'}>
        <button className={'bg-gray0 py-2 px-4 rounded-[12px]'}>수정</button>
        <button
          onClick={() => {
            setIsDeleteWarningModalOpen(!isDeleteWarningModalOpen);
            setDeletePostId(postId);
          }}
          className={'bg-black text-white py-2 px-4 rounded-[12px]'}>
          삭제
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={'flex flex-col gap-y-4'}>
        {userPostsList.map((userPosts: MyPostsResponseType) => {
          return userPosts?.result.content.map((userPost: PostType) => {
            return (
              <div key={userPost.postId} ref={ref}>
                <Post
                  postId={userPost.postId}
                  content={userPost.postContent.content}
                  title={userPost.postContent.title}
                  commentCount={userPost.postStatus.commentCount}
                  createdAt={'2023.7.12'}
                  bottomElement={bottomElement(userPost.postId)}
                  imageUrl={userPost.postContent.images.length !== 0 ? userPost.postContent.images[0].imageUrl : null}
                  likeCount={userPost.postStatus.likeCount}
                  topElement={
                    userPost.question
                      ? commentaryTopElement(
                          userPost.question.mockExam.examYear,
                          userPost.question.mockExam.round,
                          userPost.question.questionSeq,
                        )
                      : null
                  }></Post>
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default MyPageCommentaryBoardList;
