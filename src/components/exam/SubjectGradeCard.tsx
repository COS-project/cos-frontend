import React from 'react';

import { SpecificSubject } from '@/types/global';

interface SubjectGradeCardProps {
  name: SpecificSubject['name'];
  // correctAnswer: SpecificSubject['correctAnswer'];
  correctAnswer: number;
  // totalCorrect: SpecificSubject['totalProblems'];
  totalCorrect: number;
}

// 세부 과목별 성적을 나타내는 표 컴포넌트
const SubjectGradeCard: React.FC<SubjectGradeCardProps> = ({ name, correctAnswer, totalCorrect }) => {
  return (
    <div className="w-full border border-gray2">
      <div className="text-lg text-center text-h6 py-2">{name}</div>
      <div className="flex justify-center border-t border-gray2 py-2">
        <div className="flex items-end">
          <div className="font-bold text-h3">{correctAnswer}개</div>
          <div className="text-gray3 text-h7">/{totalCorrect}개</div>
        </div>
      </div>
    </div>
  );
};

export default SubjectGradeCard;
