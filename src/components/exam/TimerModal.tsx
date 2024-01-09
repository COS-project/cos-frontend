interface SessionModalProps {
  closeTimerModal: () => void;
  closeSessionModal: () => void;
}

const TimerModal: React.FC<SessionModalProps> = ({ closeTimerModal, closeSessionModal }) => {
  closeSessionModal();

  return (
    <div onClick={closeTimerModal} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[80%]">
        <button className="w-full flex justify-end text-white text-h6 px-2 my-2">닫기 X</button>
        <div className="bg-white rounded-3xl"> asdasd</div>
      </div>
    </div>
  );
};

export default TimerModal;
