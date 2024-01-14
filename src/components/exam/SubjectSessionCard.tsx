import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Session, SubjectInfo } from '@/types/global';
import { selectedSessionState, selectedSubjectState } from '@/utils/recoilState';

import SessionModal from './SessionModal';
import TimerModal from './TimerModal';

// 해당하는 연도의 회차별 데이터를 모두 출력
const SubjectSessionCard: React.FC = ({}) => {
  const [selectedSubject, setSelectedSubject] = useRecoilState<SubjectInfo | null>(selectedSubjectState);
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);
  const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false);
  const [timerModalIsOpen, setTimerModalIsOpen] = useState(false);

  // 모달이 열릴때 세션 상태 설정
  const openSessionModal = (session: Session | null) => {
    setSelectedSession(session);
    setSessionModalIsOpen(true);
  };

  const closeSessionModal = () => {
    setSessionModalIsOpen(false);
  };

  const openTimerModal = () => {
    setTimerModalIsOpen(true);
  };

  const closeTimerModal = () => {
    setSelectedSession(null);
    setTimerModalIsOpen(false);
  };

  // 해당 연도의 세션 정보를 가져오기
  const sessions = selectedSubject?.sessions;

  if (!sessions) {
    return <div>해당 연도의 데이터가 없습니다.</div>;
  }

  // 여기서 selectedSession 에 대한 전역 상태가 결정됩니다.
  return (
    <>
      {sessions.map((session, index) => (
        <div key={index} className="w-1/2 mb-4">
          <div className="w-[90%] mx-auto p-3 border border-gray2 rounded-3xl">
            <div className="text-black font-bold text-center">{`${session.sessionNumber}회차`}</div>
            <div className="border-t border-gray1 my-2"></div>
            <div className="text-black text-center text-h7">최근 점수</div>
            <ul className="flex text-center justify-center">
              <li className="font-bold text-h2">{`${session.totalCorrect}점`}</li>
              <div className="mt-1 text-gray3">{`/${session.totalProblem}점`}</div>
            </ul>
            <button
              onClick={() => openSessionModal(session)}
              className="w-full bg-gray1 rounded-3xl py-3 mt-4 text-h6 font-bold">
              시험 보기
            </button>
          </div>
        </div>
      ))}
      {/* 세션 모달에 대한 코드 */}
      {sessionModalIsOpen && selectedSession && (
        <SessionModal closeModal={closeSessionModal} openTimerModal={openTimerModal} />
      )}
      {/* 타이머 모달에 대한 코드 */}
      {timerModalIsOpen && selectedSession && (
        <TimerModal closeTimerModal={closeTimerModal} closeSessionModal={closeSessionModal} />
      )}
    </>
  );
};

export default SubjectSessionCard;
