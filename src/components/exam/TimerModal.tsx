import { Session } from '@/types/global';

interface SessionModalProps {
  selectedSession: Session;
  closeTimerModal: () => void;
  closeSessionModal: () => void;
}

const TimerModal: React.FC<SessionModalProps> = ({ selectedSession, closeTimerModal, closeSessionModal }) => {
  // 타이머 모달이 나타나면 기존 세션 모달을 종료하기 위한 동작
  closeSessionModal();

  const subjects = selectedSession.subjects;

  return (
    <div onClick={closeTimerModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%]">
        <button className="w-full flex justify-end text-white text-h6 px-2 my-2">닫기 X</button>
        <div className="bg-white rounded-3xl">
          <h2 className="flex justify-between text-h4 font-bold p-4">
            <button>{'<'}</button>
            <div>{`${selectedSession.sessionNumber}회차`}</div>
            <button>{'>'}</button>
          </h2>
          <div className="border-t border-gray1"></div>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
