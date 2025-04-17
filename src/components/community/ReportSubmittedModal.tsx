import { motion } from 'framer-motion';
import React, { SVGProps } from 'react';

interface Props {
  setIsReportSubmittedModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReportSubmittedModal = (props: Props) => {
  const { setIsReportSubmittedModalOpen } = props;
  return (
    <div
      className={
        'fixed left-0 right-0 z-50 flex flex-col gap-y-2 justify-center bg-[rgba(0,0,0,0.6)] px-5 min-h-screen'
      }>
      <motion.div
        className={'flex flex-col gap-y-2'}
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div
          onClick={() => {
            setIsReportSubmittedModalOpen(false);
          }}
          className={'flex justify-end items-center'}>
          <div className={'text-white text-h6'}>닫기</div>
          <CancelIcon />
        </div>
        <div className={'flex flex-col gap-y-4 bg-white rounded-[32px] p-5'}>
          <div className={'flex flex-col gap-y-1'}>
            <div className={'text-h2 font-semibold text-black'}>신고 접수가 완료되었습니다.</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default ReportSubmittedModal;

const CancelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <mask
      id="a"
      width={25}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M.646 0h24v24h-24z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="M12.646 12.708 7.4 17.954a.5.5 0 0 1-.345.15.47.47 0 0 1-.363-.15.5.5 0 0 1-.16-.354.5.5 0 0 1 .16-.354L11.938 12 6.692 6.754a.5.5 0 0 1-.15-.344.47.47 0 0 1 .15-.364.5.5 0 0 1 .354-.16.5.5 0 0 1 .354.16l5.246 5.246 5.246-5.246a.5.5 0 0 1 .344-.15.47.47 0 0 1 .364.15.5.5 0 0 1 .16.354.5.5 0 0 1-.16.354L13.353 12l5.247 5.246a.5.5 0 0 1 .15.344.47.47 0 0 1-.15.364.5.5 0 0 1-.354.16.5.5 0 0 1-.354-.16z"
      />
    </g>
  </svg>
);
