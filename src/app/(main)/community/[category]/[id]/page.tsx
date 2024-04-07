'use client';
import React, { useEffect, useState } from 'react';
import CommunityNav from '@/components/community/CommunityNav';
import CommunityProfile from '@/components/community/CommunityProfile';
import CommunityTag from '@/components/community/CommunityTag';
import CommunityPost from '@/components/community/CommunityPosting';
import CommentWriting from '@/components/community/CommentWriting';
import CommentBar from '@/components/community/CommentBar';
import Comment from '@/components/community/Comment';
import CommentReply from '@/components/community/CommentReply';
import ImgModal from '@/components/community/ImgModal';
import useGetCommunityPost from '@/lib/hooks/useGetCommunityPost';
import { postingModalState, commentModalState, commentDeleteState, postDeleteState } from '@/recoil/community/atom';
import { useRecoilState } from 'recoil';
import { Post, PostComments, RecommendTags } from '@/types/global';
import { format } from 'date-fns';
import { postToggleLikeData } from '@/lib/api/communityPost';
import { AxiosResponse } from 'axios';
import { useSWRConfig } from 'swr';

const CommunityDetailPage = () => {
  //커뮤니티 포스트에 해당하는 데이터를 가져옴
  const { communityPostData, isLoading, isError, mutate } = useGetCommunityPost();
  //데이터 잘 들어왔는지 확인
  useEffect(() => {
    console.log('communityPostData', communityPostData);
  }, [communityPostData]);

  //댓글의 답글달기 버튼을 클릭했을 때 사용
  const [replyOnOff, setReplyOnOff] = useState<boolean>(false);
  //몇번째 댓글의 답글달기 버튼이 클릭됐는지 확인하기 위해 사용
  const [commentNumber, setCommentNumber] = useState<number>(0);
  //대댓글을 달 때 부모댓글의 아이디를 넘겨주기 위해 사용
  const [parentId, setParentId] = useState<number>(0);
  //포스팅 삭제 및 수정기능 모달창 관련 조작
  const [onPostModal, setOnPostModal] = useRecoilState(postingModalState);
  //댓글 삭제 모달창 관련 조작
  const [onCommentModal, setOnCommentModal] = useRecoilState(commentModalState);
  //삭제하는 댓글의 아이디를 넘기기 위해 사용
  const [commentDelete, setCommentDelete] = useRecoilState(commentDeleteState);
  //삭제하는 글의 아이디를 넘기기 위해 사용
  const [postDelete, setPostDelete] = useRecoilState(postDeleteState);

  //답글달기 버튼 클릭시에 사용
  const commentReplyControll = (index: number, id: number) => {
    setReplyOnOff(!replyOnOff); //대댓글 작성란을 열고 닫음
    setParentId(id); //대댓글의 부모 아이디 저장
    setCommentNumber(index); //몇 번째 댓글에 대댓글 작성란을 열 것인지 저장
  };

  return (
    <>
      <div className="mb-[100px]">
        {/* <ImgModal></ImgModa> */}
        {/* 나중에 이 부분에 이미지 모달창을 넣을 예정 */}
        <CommunityNav Icon={false}>해설 게시판</CommunityNav>
        {communityPostData ? ( //데이터가 있을 때만 뜨도록 함
          <div>
            <div className="pt-[21px]"></div>
            <div className="mx-[20px]">
              <CommunityProfile
                fontsizing={true} //폰트 크기를 작게
                date={format(communityPostData.createdAt, 'yy.MM.dd')} //날짜
                time={format(communityPostData.createdAt, 'HH:mm')} //시간
                imgSrc={communityPostData.user.profileImag} //프로필 이미지
                onClick={() => {
                  //...버튼 클릭했을 때 동작
                  setOnPostModal(!onPostModal);
                  setPostDelete(communityPostData.postId);
                }}>
                {communityPostData.user.nickname}
              </CommunityProfile>
              <div className="pb-[16px]"></div>
              <div className="justify-start items-start gap-2 inline-flex">
                {/* 태그가 있을 때 실행 */}
                {communityPostData.recommendTags?.map((tag: RecommendTags, index: number) => {
                  return <CommunityTag key={index}>{tag.tagName}</CommunityTag>;
                })}
                <CommunityTag>{communityPostData.mockExam?.examYear}년도</CommunityTag>
                <CommunityTag>{communityPostData.mockExam?.round}회차</CommunityTag>
                <CommunityTag>{communityPostData.question?.questionId}번</CommunityTag>
              </div>
              <CommunityPost
                subject={communityPostData.title}
                content={communityPostData.content}
                images={communityPostData.postImages}></CommunityPost>
              <CommentBar
                empathy={communityPostData.likeCount} //공감수
                comment={communityPostData.commentCount} //댓글수
                isLike={communityPostData.isLiked}//사용자 좋아요 클릭 여부
                onClick={async () => {
                  //추천버튼 클릭 시 동작
                  await postToggleLikeData(communityPostData.postId, 'POST');
                  await mutate();
                  //mutete를 사용하여 반영이 바로 되도록 구현
                }}></CommentBar>
              <CommentWriting postId={communityPostData.postId}></CommentWriting>
              <div className="h-2"></div>
              {communityPostData.postComments?.toReversed().map((postComment: PostComments, index: number) => {
                return (
                  <div key={index}>
                    <Comment
                      profileModal={() => {
                        //프로필 부분의 ...버튼 클릭시 동작
                        setOnCommentModal(!onCommentModal); //댓글 삭제 모달창 띄움
                        setCommentDelete(postComment.postCommentId); //삭제 버튼 클릭시에 넘겨줄 댓글id를 저장함
                      }}
                      //답글하기 버튼 클릭시 동작
                      onClick={() => commentReplyControll(index, postComment.postCommentId)}
                      //하위 컴포넌트에 넘겨줄 정보
                      info={postComment}
                      //추천버튼 클릭시에 동작
                      DdabongClick={async () => {
                        await postToggleLikeData(postComment.postCommentId, 'COMMENT');
                        await mutate();
                      }}></Comment>
                    {postComment.childPostComments?.map(
                      //대댓글
                      //AxiosResponse<PostComments>
                      (childPostComment: PostComments, index: number) => {
                        return (
                          <CommentReply //대댓글
                            key={index}
                            profileModal={() => {
                              //프로필의 ...버튼 클릭 시 동작
                              setOnCommentModal(!onCommentModal);
                              setCommentDelete(childPostComment.postCommentId);
                            }}
                            info={childPostComment} //하위 컴포넌트에 넘겨줄 정보
                            DdabongClick={async () => {
                              //추천버튼 클릭 시 동작
                              await postToggleLikeData(childPostComment.postCommentId, 'COMMENT');
                              await mutate();
                            }}></CommentReply>
                        );
                      },
                    )}
                    {replyOnOff ? ( //답글달기 버튼이 눌러졌고
                      commentNumber == index ? ( //답글달기가 눌러진 댓글의 순서와 현재 보여져야할 댓글의 순서가 일치하면
                        <div>
                          {/* 대댓글을 생성하는 입력란이 보여짐 */}
                          <CommentWriting
                            postId={communityPostData.postId}
                            commentId={parentId}
                            padding="pl-[48px]"></CommentWriting>
                        </div>
                      ) : null
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default CommunityDetailPage;
