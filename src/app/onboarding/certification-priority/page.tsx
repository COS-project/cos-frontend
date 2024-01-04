'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import DoneButton from '@/components/onboarding/DoneButton';
import { LicenseInfo } from '@/types/global';

const CertificationPriority = () => {
  const router = useRouter();

  // 자격증 데이터
  const [certifications, setCertifications] = useState<LicenseInfo[]>([
    // TODO: 백엔드 API 받으면 변경될 예정
    { id: '1', title: '컴퓨터활용능력시험 1급' },
    { id: '2', title: '컴퓨터활용능력시험 2급' },
    { id: '3', title: '정보처리기사' },
  ]);

  //완료 버튼이 눌리면 primary 컬러로 바뀌도록 하는 state
  const [isClick, setIsClick] = useState<boolean>(false);

  //완료버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onAfterClick = () => {
    setIsClick(!isClick);
    router.push('/home');
  };

  //이전버튼 눌렀을 시 이전페이지로 이동되는 함수
  const onBeforeClick = () => {
    router.push('/onboarding/choose-certification');
  };

  //드레그 엔 드롭 순서 저장하는 함수
  const handleChange = (result) => {
    if (!result.destination) return;

    console.log(result);
    const items = [...certifications];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCertifications(items);
  };

  return (
    <div>
      {/* TODO: Header */}
      <div>
        <button onClick={onBeforeClick}>이전</button>
      </div>

      {/* 온보딩 멘트 */}
      <div className="grid gap-y-8 m-4">
        <div className="grid">
          <span className="text-h1 font-bold">
            우선 순위대로 <br /> 자격증을 설정해주세요
          </span>
          <span className="text-h5 text-gray4">우선 순위가 높은 종목부터 맨위로 끌어다 놓으세요.</span>
        </div>

        {/* 자격증 종류 나열 - drag and drop*/}
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div className="grid gap-y-2" ref={provided.innerRef} {...provided.droppableProps}>
                {certifications.map(({ id, title }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="w-full h-16 bg-gray0 rounded-full"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}>
                        <div>
                          <div className="flex items-center gap-x-3 p-2">
                            <div className="w-12 h-12 rounded-full bg-white">
                              <div className="p-[10px]">
                                <Icon />
                              </div>
                            </div>
                            <div className="text-h4 font-semibold">{title}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* 완료 버튼 */}
      <DoneButton onClick={onAfterClick} isClick={isClick}>
        완료
      </DoneButton>
    </div>
  );
};
export default CertificationPriority;

function Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.16024 20.1474C5.0204 20.1474 4.90317 20.0997 4.80855 20.0042C4.71396 19.9088 4.66666 19.7905 4.66666 19.6493C4.66666 19.5082 4.71396 19.3914 4.80855 19.299C4.90317 19.2065 5.0204 19.1602 5.16024 19.1602H22.8397C22.9796 19.1602 23.0968 19.208 23.1914 19.3034C23.286 19.3989 23.3333 19.5172 23.3333 19.6583C23.3333 19.7994 23.286 19.9162 23.1914 20.0087C23.0968 20.1012 22.9796 20.1474 22.8397 20.1474H5.16024ZM5.16024 14.4936C5.0204 14.4936 4.90317 14.4458 4.80855 14.3504C4.71396 14.2549 4.66666 14.1366 4.66666 13.9955C4.66666 13.8544 4.71396 13.7376 4.80855 13.6451C4.90317 13.5526 5.0204 13.5064 5.16024 13.5064H22.8397C22.9796 13.5064 23.0968 13.5541 23.1914 13.6496C23.286 13.745 23.3333 13.8633 23.3333 14.0044C23.3333 14.1455 23.286 14.2623 23.1914 14.3548C23.0968 14.4473 22.9796 14.4936 22.8397 14.4936H5.16024ZM5.16024 8.83971C5.0204 8.83971 4.90317 8.79198 4.80855 8.6965C4.71396 8.60105 4.66666 8.48277 4.66666 8.34166C4.66666 8.20054 4.71396 8.08373 4.80855 7.99126C4.90317 7.89878 5.0204 7.85254 5.16024 7.85254H22.8397C22.9796 7.85254 23.0968 7.90027 23.1914 7.99572C23.286 8.09117 23.3333 8.20946 23.3333 8.35059C23.3333 8.4917 23.286 8.60849 23.1914 8.70097C23.0968 8.79347 22.9796 8.83971 22.8397 8.83971H5.16024Z"
        fill="#0D0E10"
      />
    </svg>
  );
}
