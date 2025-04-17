import React from 'react';
import { useSetRecoilState } from 'recoil';

import {
  selectedCommentaryYearFilterContentAtom,
  selectedNormalAndTipFilterContentAtom,
} from '@/recoil/community/atom';
import { BoardType, SortFieldKorType } from '@/types/community/type';

interface Props {
  boardType: BoardType;
  setBoardType: React.Dispatch<React.SetStateAction<BoardType>>;
  checkReviewPeriod?: boolean | undefined;
}
const BoardTypeMenu = (props: Props) => {
  const { boardType, setBoardType, checkReviewPeriod } = props;
  const changeBoardType = (type: BoardType) => {
    setBoardType(type);
  };
  //필터값
  const setSelectedNormalAndTipFilterContent = useSetRecoilState<SortFieldKorType>(
    selectedNormalAndTipFilterContentAtom,
  );
  const setSelectedCommentaryYearFilterContent = useSetRecoilState<number | string>(
    selectedCommentaryYearFilterContentAtom,
  );

  return (
    <div className={'bg-white px-4 py-3 flex gap-x-2 w-full overflow-x-scroll'}>
      {checkReviewPeriod && (
        <button
          onClick={() => {
            changeBoardType('REVIEW');
            setSelectedNormalAndTipFilterContent('최신순');
            setSelectedCommentaryYearFilterContent('전체');
          }}
          className={boardType === 'REVIEW' ? 'tag-clicked' : 'tag-not-clicked'}>
          따끈후기
        </button>
      )}
      <button
        onClick={() => {
          changeBoardType('COMMENTARY');
          setSelectedNormalAndTipFilterContent('최신순');
          setSelectedCommentaryYearFilterContent('전체');
        }}
        className={boardType === 'COMMENTARY' ? 'tag-clicked' : 'tag-not-clicked'}>
        해설게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('TIP');
          setSelectedNormalAndTipFilterContent('최신순');
          setSelectedCommentaryYearFilterContent('전체');
        }}
        className={boardType === 'TIP' ? 'tag-clicked' : 'tag-not-clicked'}>
        꿀팁게시판
      </button>
      <button
        onClick={() => {
          changeBoardType('NORMAL');
          setSelectedNormalAndTipFilterContent('최신순');
          setSelectedCommentaryYearFilterContent('전체');
        }}
        className={boardType === 'NORMAL' ? 'tag-clicked' : 'tag-not-clicked'}>
        자유게시판
      </button>
    </div>
  );
};
export default BoardTypeMenu;
