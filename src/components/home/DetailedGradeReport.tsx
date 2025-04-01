'use client';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useGetMockExamDetail from '@/lib/hooks/useGetMockExamDetail';
import { CertificateMaxScoreAtom, selectedDateTypeState } from '@/recoil/home/atom';
import { DetailGradeReportType } from '@/types/home/type';

interface Props {
  prepareYear: string;
  prepareMonth: number | undefined;
  prepareWeekly: number | undefined;
  prepareDate: string | undefined;
  scoreAverage: number;
  dayOfWeek: string | undefined; //주차면 요일, 월별 몇주차, 년도 몇월
}

const DetailedGradeReport = (props: Props) => {
  const { scoreAverage, dayOfWeek, prepareYear, prepareMonth, prepareWeekly, prepareDate } = props;
  const [selectedDateType] = useRecoilState<'DATE' | 'WEEK_OF_MONTH' | 'MONTH'>(selectedDateTypeState);

  // 데이터 상태 관리
  const [page, setPage] = useState<number>(0);
  const [allItems, setAllItems] = useState<DetailGradeReportType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 요청 식별자
  const propsSignature = `${selectedDateType}-${prepareYear}-${prepareMonth ?? ''}-${prepareWeekly ?? ''}-${
    prepareDate ?? ''
  }`;
  const prevPropsSignatureRef = useRef(propsSignature);

  // 초기화 여부 플래그
  const isInitializedRef = useRef(false);

  // 스크롤 감지를 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  const PAGE_SIZE = 10; // 한 번에 가져올 아이템 수

  const { statisticsDetailData, mutate } = useGetMockExamDetail(
    selectedDateType,
    prepareYear,
    prepareMonth,
    prepareWeekly,
    prepareDate,
    page,
    PAGE_SIZE,
  );

  // 컴포넌트가 마운트될 때 딱 한 번만 실행됨
  useEffect(() => {
    isInitializedRef.current = true;
  }, []);

  // props가 변경되었을 때만 데이터 초기화 및 다시 요청
  useEffect(() => {
    // 최초 마운트 시에는 실행하지 않음
    if (!isInitializedRef.current) {
      return;
    }

    // 이전 props와 현재 props 비교
    if (prevPropsSignatureRef.current !== propsSignature) {
      console.log('Props 변경 감지:', prevPropsSignatureRef.current, '->', propsSignature);

      // 새로운 props 저장
      prevPropsSignatureRef.current = propsSignature;

      // 데이터 상태 초기화
      setAllItems([]);
      setPage(0);
      setHasMore(true);
      setIsLoading(false);
    }
  }, [propsSignature]);

  // 페이지가 변경되었을 때만 데이터 다시 요청
  useEffect(() => {
    if (isInitializedRef.current) {
      mutate();
    }
  }, [page, propsSignature, mutate]);

  // 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (statisticsDetailData) {
      if (page === 0) {
        // 첫 페이지일 경우 기존 데이터 완전 대체
        setAllItems(statisticsDetailData.content);
      } else {
        // 페이지네이션의 경우 데이터 추가
        setAllItems((prevItems) => [...prevItems, ...statisticsDetailData.content]);
      }

      setHasMore(statisticsDetailData.hasNext);
      setIsLoading(false);
    }
  }, [statisticsDetailData, page]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // 마지막 아이템 ref가 변경될 때마다 observer 업데이트
  useEffect(() => {
    if (lastItemRef.current && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(lastItemRef.current);
    }
  }, [allItems]);

  // 더 많은 아이템 로드
  const loadMoreItems = () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * 모의고사 응시 날짜를 format 하는 함수
   * @param date 모의고사 응시 날짜
   */
  const formattedDate = (date: Date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = parseInt(('0' + month).slice(-2));
    day = parseInt(('0' + day).slice(-2));

    let formattedDate = month + '.' + day;
    return formattedDate;
  };

  return (
    <>
      <div className={'rounded-[24px] border-[1px] border-gray2 bg-white'}>
        <div className={'flex justify-around py-4 rounded-[24px] border-b-[1px] border-gray2 bg-gray0'}>
          <div className={'font-semibold text-h6'}>{dayOfWeek}</div>
          <div className={'font-semibold text-h6'}>치룬 모의고사</div>
          <div className={'font-semibold text-h6'}>점수</div>
        </div>
        {/* 스크롤 영역 - 컴포넌트 높이가 270px 넘으면 스크롤 */}
        <div className={'max-h-[220px] overflow-y-auto'}>
          {allItems.length === 0 && !isLoading ? (
            <div className="py-4 text-center text-gray-500">데이터가 없습니다</div>
          ) : (
            allItems.map((detail: DetailGradeReportType, index: number) => {
              // key에 props 시그니처를 포함시켜 고유성 보장
              const itemKey = `${propsSignature}-${detail.mockExamResultId}-${index}`;

              // 마지막 아이템에 ref 연결
              if (index === allItems.length - 1) {
                return (
                  <div ref={lastItemRef} key={itemKey} className={'flex justify-around py-4 text-h6'}>
                    <div>{formattedDate(new Date(detail.createdAt))}</div>
                    <div>
                      {detail.mockExam.examYear}년도 {detail.mockExam.round}회차
                    </div>
                    <div>{detail.totalScore}점</div>
                  </div>
                );
              } else {
                return (
                  <div key={itemKey} className={'flex justify-around py-4 text-h6'}>
                    <div>{formattedDate(new Date(detail.createdAt))}</div>
                    <div>
                      {detail.mockExam.examYear}년도 {detail.mockExam.round}회차
                    </div>
                    <div>{detail.totalScore}점</div>
                  </div>
                );
              }
            })
          )}
          {isLoading && (
            <div className="flex justify-center py-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
        <div
          className={
            'flex justify-center text-primary text-h6 font-semibold border-t-[1px] border-gray2 rounded-b-[24px] py-4 bg-white'
          }>
          <div>평균 점수: {scoreAverage}</div>
        </div>
      </div>
    </>
  );
};

export default DetailedGradeReport;
