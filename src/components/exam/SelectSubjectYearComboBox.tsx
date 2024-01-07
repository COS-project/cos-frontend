'use client';
import React, { useState } from 'react';

import { SubjectInfo } from '@/types/global';
import SubjectData from '@/utils/dummyData'; // Import dummy data

import SubjectSessionCard from './SubjectSessionCard';

// 과목에 Year를 필터링 해주는 모듈
const SelectSubjectYearComboBox = ({}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectInfo | null>(null);

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value, 10);
    const newSelectedSubject = SubjectData.find((subject) => subject.year === selectedYear) || null;
    setSelectedSubject(newSelectedSubject);
  };

  // Get unique years from SubjectData
  const uniqueYears = Array.from(new Set(SubjectData.map((subject) => subject.year)));

  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        value={selectedSubject?.year || ''}
        onChange={handleSubjectChange}
        className="mx-auto mt-1 text-h4 font-bold block w-[90%] p-3 bg-gray0 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        {uniqueYears.map((year, index) => (
          <option key={index} value={year}>
            {year}년 기출 모의고사
          </option>
        ))}
      </select>
      <div className="w-[95%] mx-auto">
        <div className="mt-4 flex flex-wrap">
          <SubjectSessionCard selectedSubject={selectedSubject} />
        </div>
      </div>
    </div>
  );
};

export default SelectSubjectYearComboBox;
