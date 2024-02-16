'use client';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { useGetExamInfoData, useGetExamYearData } from '@/lib/hooks/ExamInfoFetcher';
import { examYearList } from '@/types/global';
import { YearState } from '@/utils/recoilState';

// 과목의 Year를 선택하는 모듈
const YearSelector = ({}) => {
  // 과목의 연도의 상태를 관리하는 state
  const [selectedYear, setSelectedYear] = useRecoilState<Number | undefined>(YearState);
  const { Data } = useGetExamInfoData();

  // year정보만 추출하기
  const yearKeys = Object.keys(Data?.result?.examYearWithRounds || {});
  // 추출한 데이터 정수형으로 변환하기
  const yearsAsIntegers = yearKeys.map((year) => parseInt(year, 10));

  // 연도 리스트가 들어간거임
  const examYears: examYearList = {
    years: yearsAsIntegers,
  };

  // 받아온 연도에 첫번째로 set
  const defaultYear = examYears.years[0] || undefined;

  // selectbox에 들어갈 년도 배열 정립
  const uniqueYears = examYears.years || null;

  useEffect(() => {
    setSelectedYear(defaultYear);
  }, [setSelectedYear, defaultYear]);

  // 연도 변경하여 상태에 저장하는 함수
  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    setSelectedYear(selectedYear);
  };

  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        value={selectedYear?.toString() || ''}
        onChange={handleSubjectChange}
        className="mx-auto mt-1 text-h4 font-bold block w-[100%] p-3 bg-gray0 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        {uniqueYears.map((year, index) => (
          <option key={index} value={year}>
            {year}년 기출 모의고사
          </option>
        ))}
      </select>
      {/* <div>
        <div className="mt-4 flex flex-wrap">
          <SubjectSessionCard />
        </div>
      </div> */}
    </div>
  );
};

export default YearSelector;
