import SubjectSessionCard from './SubjectSessionCard';

// 해당 과목의 연도를 필터링 하기 위한 모듈
const SelectSubjectYearComboBox = () => {
  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        className="mx-auto mt-1 text-h4 font-bold block w-[90%] p-3 bg-gray0 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        <option>2022년 기출 모의고사</option>
        <option>2023년 기출 모의고사</option>
        <option>2024년 기출 모의고사</option>
      </select>
      <div className="w-[95%] mx-auto">
        <div className="mt-4 flex flex-wrap">
          <SubjectSessionCard />
          <SubjectSessionCard />
          <SubjectSessionCard />
          <SubjectSessionCard />
          <SubjectSessionCard />
          <SubjectSessionCard />
        </div>
      </div>
    </div>
  );
};

export default SelectSubjectYearComboBox;
