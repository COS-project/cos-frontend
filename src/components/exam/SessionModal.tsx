import SubjectGradeCard from './SubjectGradeCard';

// 회차별 모달
const SessionModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  // 예시 데이터
  const subjects = ['컴퓨터 일반', '스프레드시트', '데이터베이스'];
  const grades = ['4', '6', '2'];

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="w-[80%]">
          <button onClick={closeModal} className="w-full flex justify-end text-white text-h6 px-2 my-2">
            닫기 X
          </button>
          <div className="bg-white rounded-3xl">
            <div className="w-[90%] mx-auto">
              <h2 className="flex justify-between text-h4 font-bold p-4">
                <button>{'<'}</button>
                <div>n회차</div>
                <button>{'>'}</button>
              </h2>
              <div className="border-t border-gray1"></div>
              <div className="flex justify-between my-3">
                <div>
                  <div className="font-bold text-h6">최근 점수</div>
                  <div className="flex items-end">
                    <div className="font-bold text-h1">30점</div>
                    <div className="mt-1 text-gray3">/50점</div>
                  </div>
                </div>
                <button className="h-1/2 bg-gray0 rounded-3xl text-h6 font-bold p-2">성적 리포트 ➚</button>
              </div>
              <div className="text-h6 font-bold mt-5">과목별 맞춘 문제 수</div>
              <div className="flex my-2">
                {subjects.map((subject, index) => (
                  <SubjectGradeCard key={index} subject={subject} grade={grades[index]} />
                ))}
              </div>
              <div className="flex justify-center">
                <button className="w-full bg-black text-white rounded-3xl text-h5 p-4 my-4">시험 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
