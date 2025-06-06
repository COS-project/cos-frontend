import React, { SVGProps, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState, useRecoilValue } from 'recoil';

import MyPageFilter from '@/components/mypage/MyPageFilter';
import Post from '@/components/mypage/Post';
import useBest3TipPosts from '@/lib/hooks/useBest3TipPosts';
import useGetTotalSearchResults from '@/lib/hooks/useGetTotalSearchResults';
import { certificateIdAtom } from '@/recoil/atom';
import { selectedNormalAndTipFilterContentAtom } from '@/recoil/community/atom';
import { BoardType, PostType, SortFieldType } from '@/types/community/type';
import { filterNormalAndTipContent } from '@/utils/community/FilterContent';
interface Props {
  boardType: BoardType;
  init: boolean; //처음 랜더링 되는지 상태 -> best 더보기 클릭시 필터값 변경 트릭
}
const NormalAndTipBoardList = (props: Props) => {
  const { boardType, init } = props;
  const [ref, inView] = useInView();
  const certificateId = useRecoilValue(certificateIdAtom);
  const [sortField, setSortField] = useState<SortFieldType>('createdAt'); //최신순 인기순
  const { userPosts, size, setSize } = useGetTotalSearchResults(boardType, certificateId, sortField);
  //필터값
  const [isOpenNormalAndTipFilter, setIsOpenNormalAndTipFilter] = useState<boolean>(false);
  const [selectedNormalAndTipFilterContent, setSelectedNormalAndTipFilterContent] = useRecoilState<'최신순' | '인기순'>(
    selectedNormalAndTipFilterContentAtom,
  );
  const { bestTipPosts } = useBest3TipPosts(certificateId);

  /**
   * 무한 스크롤 뷰 감지하고 size+1 해줌
   */
  const getMoreItem = useCallback(async () => {
    if (userPosts) {
      await setSize((prev: number) => prev + 1);
    }
    return;
  }, [setSize]);

  useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView, getMoreItem]);

  /**
   * 일반, 꿀팁 게시판 필터
   */
  useEffect(() => {
    if (selectedNormalAndTipFilterContent == '최신순') {
      setSortField('createdAt');
    } else if (selectedNormalAndTipFilterContent == '인기순') {
      setSortField('count');
    }
  }, [selectedNormalAndTipFilterContent]);

  /**
   * Best3 Post 태그
   */
  const tipTopElement = (normalTipPostId: number): JSX.Element | undefined => {
    if (bestTipPosts) {
      const bestTipPost = bestTipPosts.find((post: PostType) => post.postId === normalTipPostId);
      if (bestTipPost) {
        return (
          <div key={normalTipPostId} className={'pb-2'}>
            <div className={'px-3 py-[2px] text-white bg-primary rounded-full w-fit font-light'}>BEST</div>
          </div>
        );
      }
    }
    return undefined;
  };

  /**
   * 날짜 format 함수 2024.04.04
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // 년, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, '0'); // 일자를 2자리로 맞춤

    // 원하는 형식으로 반환
    return `${year}.${month}.${day}`;
  };

  return (
    <div className={'relative px-5 flex flex-col gap-y-4'}>
      <div>
        <div
          onClick={() => setIsOpenNormalAndTipFilter(!isOpenNormalAndTipFilter)}
          className={'relative w-fit flex px-3 py-1 rounded-full bg-white '}>
          <span className={'text-gray4 text-h6'}>{selectedNormalAndTipFilterContent}</span>
          {isOpenNormalAndTipFilter ? <ActivationIcon /> : <DisableIcon />}
          {isOpenNormalAndTipFilter ? (
            <MyPageFilter
              className={boardType === 'TIP' ? 'top-[120%] left-0 w-full' : 'top-[120%] left-0 w-full'}
              isFilterOpen={isOpenNormalAndTipFilter}
              setSelectedFilterContent={setSelectedNormalAndTipFilterContent}
              setIsFilterOpen={setIsOpenNormalAndTipFilter}
              data={filterNormalAndTipContent}
            />
          ) : null}
        </div>
      </div>
      <div className={'flex flex-col gap-y-4'}>
        {userPosts.map((userPosts) => {
          const posts = userPosts?.result?.content; // 안전한 접근
          if (!posts) return null; // 데이터가 없는 경우 렌더링하지 않음

          return posts.map((postResponse) => {
            return (
              <div ref={ref} key={postResponse.postId}>
                <Post
                  postId={postResponse.postId}
                  content={postResponse.postContent.content || ''}
                  title={postResponse.postContent.title || ''}
                  commentCount={postResponse.commentCount || 0}
                  likeCount={postResponse.likeCount || 0}
                  likeStatus={postResponse.likeStatus || false}
                  createdAt={
                    postResponse.dateTime.modifiedAt
                      ? formatDate(postResponse.dateTime.createdAt)
                      : formatDate(postResponse.dateTime.createdAt)
                  }
                  imageUrl={postResponse.postImages.length ? postResponse.postImages[0].imageUrl : null}
                  topElement={postResponse.recommendTags ? tipTopElement(postResponse.postId) : undefined}
                />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
export default NormalAndTipBoardList;

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
