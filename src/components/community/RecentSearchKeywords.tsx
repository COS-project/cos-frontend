import * as React from 'react';
import { SVGProps, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { deleteAllSearchResults, deleteEachSearchResult } from '@/lib/api/community';
import useGetRecentSearchResults from '@/lib/hooks/useGetRecentSearchResults';
import { certificateIdAtom } from '@/recoil/atom';
import { autoCompleteSearchKeywordState, recentSearchResultState } from '@/recoil/community/atom';

interface Props {
  keywords: string[] | undefined;
}

const RecentSearchKeywords = (props: Props) => {
  const { keywords } = props;
  const certificateId = useRecoilValue(certificateIdAtom);
  const { mutate } = useGetRecentSearchResults(certificateId);
  const [recentSearchResult, setRecentSearchResult] = useRecoilState(recentSearchResultState);
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);

  useEffect(() => {
    deleteEachSearchResult(certificateId, recentSearchResult).then(() => mutate());
  }, [recentSearchResult]);

  return (
    <>
      <div className={'flex flex-col gap-y-3'}>
        <div className={'flex justify-between'}>
          <div className={'text-h4 font-semibold ml-2'}>최근 검색어</div>
          <button
            onClick={() => {
              deleteAllSearchResults(certificateId).then(() => {
                mutate();
              });
            }}
            className={'text-gray4 text-h6'}>
            전체삭제
          </button>
        </div>

        <div className={'w-[100%] overflow-x-scroll flex gap-x-2'}>
          {keywords
            ? keywords.map((keyword: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={'flex items-center gap-x-1 flex-shrink-0 py-1 px-3 rounded-[8px] bg-white w-fit'}>
                    <div onClick={() => setSearchValue(keyword)} className={'text-gray4 text-h4'}>
                      {keyword}
                    </div>
                    <DeleteButton
                      className={'cursor-pointer'}
                      onClick={() => {
                        setRecentSearchResult(keyword);
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
export default RecentSearchKeywords;

const DeleteButton = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <rect width={20} height={20} fill="#F4F5F7" rx={10} />
    <path stroke="#727375" d="m13.535 6.464-7.07 7.071M6.464 6.464l7.071 7.071" />
  </svg>
);
