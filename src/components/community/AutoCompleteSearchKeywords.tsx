import React from 'react';
import { useRecoilState } from 'recoil';

import { autoCompleteSearchKeywordState } from '@/recoil/community/atom';
import { findMatchingCharacters } from '@/utils/search/fun';

interface CharacterHighlightProps {
  query: string | null;
  text: string;
}

interface Props {
  query: string | null;
  keywords: string[] | undefined;
  setIsClickedAutoCompleteSearchKeywords: React.Dispatch<React.SetStateAction<boolean>>;
}
const AutoCompleteSearchKeywords = (props: Props) => {
  const { query, keywords, setIsClickedAutoCompleteSearchKeywords } = props;
  const [searchValue, setSearchValue] = useRecoilState<string>(autoCompleteSearchKeywordState);

  const autoCompleteSearchValue = (keyword: string) => {
    setSearchValue(keyword);
  };

  return (
    <>
      <div className={'absolute w-full bg-white border-b-[1px] border-x-[1px] border-gray2 rounded-b-[16px] shadow-md'}>
        {keywords
          ? keywords.map((keyword: string, index: number) => {
              return (
                <div
                  onClick={() => {
                    autoCompleteSearchValue(keyword);
                    setIsClickedAutoCompleteSearchKeywords(false);
                  }}
                  key={index}
                  className={'py-[12px] px-[12px] text-gray3'}>
                  <CharacterHighlight query={query} text={keyword} />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};
export default AutoCompleteSearchKeywords;

const CharacterHighlight: React.FC<CharacterHighlightProps> = ({ query, text }) => {
  // 매칭된 문자들의 인덱스 찾기
  const matchedIndices: number[] = findMatchingCharacters(query, text);

  // 매칭 결과가 없으면 원본 텍스트 그대로 표시
  if (matchedIndices.length === 0) {
    return <span>{text}</span>;
  }

  // 매칭 결과가 있으면 하이라이트 처리
  const result: JSX.Element[] = [];

  for (let i = 0; i < text.length; i++) {
    if (matchedIndices.includes(i)) {
      // 매칭된 문자는 하이라이트
      result.push(
        <span key={i} className={'text-blue'}>
          {text[i]}
        </span>,
      );
    } else {
      // 매칭되지 않은 문자는 그대로 표시
      result.push(<span key={i}>{text[i]}</span>);
    }
  }

  return <span>{result}</span>;
};
