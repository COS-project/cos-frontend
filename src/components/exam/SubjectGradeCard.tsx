import React from 'react';

const SubjectGradeCard = ({ subject, grade }) => {
  return (
    <div className="w-full border border-gray2">
      <div className="text-lg text-center text-h6 py-2">{subject}</div>
      <div className="flex justify-center border-t border-gray2 py-2">
        <div className="flex items-end">
          <div className="font-bold text-h3">{grade}개</div>
          <div className="text-gray3 text-h7">/50개</div>
        </div>
      </div>
    </div>
  );
};

export default SubjectGradeCard;
