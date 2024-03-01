import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { Round, Session, SubjectInfo } from '@/types/global';
import { selectedSessionState, selectedSubjectState } from '@/utils/recoilState';

import SessionModal from './SessionModal';
import TimerModal from './TimerModal';

interface SubjectCard {
  round: number;
  score: number;
  total: number;
  isTaken: boolean;
}

const SubjectCard: React.FC<SubjectCard> = ({ round, score, total, isTaken }) => {
  const [selectedSubject, setSelectedSubject] = useRecoilState<SubjectInfo | null>(selectedSubjectState);
  const [selectedSession, setSelectedSession] = useRecoilState<Session | null>(selectedSessionState);

  // 모달 관련 states
  const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false);
  const [timerModalIsOpen, setTimerModalIsOpen] = useState(false);

  // 모달이 열릴때 세션 상태 설정
  const openSessionModal = () => {
    // setSelectedSession(session);
    // setSelectedRound(round);
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

  return (
    <div>
      <div className="w-[90%] mx-auto p-3 border border-gray2 rounded-3xl">
        <div className="text-black font-bold text-center">{`${round}회차`}</div>
        <div className="border-t border-gray1 my-2"></div>
        <div className="text-black text-center text-h7">최근 점수</div>
        <ul className="flex text-center justify-center">
          <li className="font-bold text-h2">{`${score}점`}</li>
          <div className="mt-1 text-gray3">{`/${total}점`}</div>
        </ul>
        <button onClick={() => openSessionModal()} className="w-full bg-gray1 rounded-3xl py-3 mt-4 text-h6 font-bold">
          시험 보기
        </button>
      </div>
      {sessionModalIsOpen && (
        <SessionModal
          closeModal={closeSessionModal}
          openTimerModal={openTimerModal}
          round={round}
          main={score}
          total={total}
        />
      )}
      {/* 타이머 모달에 대한 코드 */}
      {timerModalIsOpen && <TimerModal closeTimerModal={closeTimerModal} closeSessionModal={closeSessionModal} />}
    </div>
  );
};

export default SubjectCard;
