'use client';

import React from 'react';
import { useRecoilState } from 'recoil';

import { goalSettingState } from '@/recoil/home/atom';

interface Props {
  usage: 'MockExam' | 'StudyTime';
}

const SelectRepeatDayItem = ({ usage }: Props) => {
  const [goalData, setGoalData] = useRecoilState(goalSettingState);

  const selectedDays = usage === 'MockExam' ? goalData.mockExamRepeatDays : goalData.studyRepeatDays;

  // ✅ 아직 초기화가 안되었으면 렌더링하지 않음
  const isInitialized =
    usage === 'MockExam' ? Array.isArray(goalData.mockExamRepeatDays) : Array.isArray(goalData.studyRepeatDays);

  if (!isInitialized) return null;

  const toggleDay = (day: number) => {
    const updatedDays = selectedDays.includes(day) ? selectedDays.filter((d) => d !== day) : [...selectedDays, day];

    setGoalData((prev) => ({
      ...prev,
      ...(usage === 'MockExam' ? { mockExamRepeatDays: updatedDays } : { studyRepeatDays: updatedDays }),
    }));
  };

  const dayButtons = [
    { label: '월', value: 1 },
    { label: '화', value: 2 },
    { label: '수', value: 3 },
    { label: '목', value: 4 },
    { label: '금', value: 5 },
    { label: '토', value: 6 },
    { label: '일', value: 0 },
  ];

  return (
    <div className="goal-setting-content">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-1 items-center">
          <Icon />
          <div className="text-gray3 text-h6">반복 요일 선택</div>
        </div>
        <div className="flex gap-x-1">
          {dayButtons.map(({ label, value }) => {
            const isActive = selectedDays.includes(value);
            return (
              <button
                key={value}
                onClick={() => toggleDay(value)}
                className={
                  isActive
                    ? 'bg-primary w-10 h-10 rounded-[8px] text-h4 text-white'
                    : 'bg-white w-10 h-10 rounded-[8px] text-h4'
                }>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectRepeatDayItem;

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="prefix__a" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M5.927 18.192l1.735 1.735a.488.488 0 010 .708.511.511 0 01-.357.168.488.488 0 01-.357-.163l-2.383-2.382a.785.785 0 01-.183-.268.818.818 0 01-.053-.298c0-.107.017-.207.053-.298a.786.786 0 01.183-.267l2.383-2.383a.484.484 0 01.713.006c.107.11.161.228.163.354a.485.485 0 01-.162.354l-1.735 1.734h10.765c.18 0 .327-.057.443-.173a.599.599 0 00.173-.442v-2.885c0-.142.047-.26.143-.357a.484.484 0 01.357-.143c.142 0 .26.048.356.143a.485.485 0 01.144.357v2.885c0 .447-.158.828-.472 1.143a1.557 1.557 0 01-1.144.472H5.927zM18.073 6.808H7.308a.599.599 0 00-.443.173.599.599 0 00-.173.442v2.885a.484.484 0 01-.143.356.484.484 0 01-.357.144.484.484 0 01-.356-.144.484.484 0 01-.144-.356V7.423c0-.447.158-.828.472-1.143a1.557 1.557 0 011.144-.472h10.765l-1.735-1.735a.488.488 0 010-.708.51.51 0 01.357-.168.488.488 0 01.357.163l2.383 2.382a.786.786 0 01.183.268.82.82 0 01.053.298.82.82 0 01-.053.298.786.786 0 01-.183.267l-2.383 2.383a.484.484 0 01-.713-.006.516.516 0 01-.163-.354.485.485 0 01.163-.354l1.734-1.734z"
          fill="#9E9FA1"
        />
      </g>
    </svg>
  );
}
