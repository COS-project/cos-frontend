'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import CertificationClassificationItem from '@/app/(main)/mypage/components/CertificationClassificationItem';
import DoneButton from '@/app/(main)/mypage/components/DoneButton';

const CertificationPriority = () => {
  //다음 페이지 이동
  const router = useRouter();
  //자격증 데이터
  const [certifications, setCertifications] = useState([
    { id: "1", title: "컴퓨터활용능력시험 1급" },
    { id: "2", title: "컴퓨터활용능력시험 2급" },
    { id: "3", title: "정보처리기사" },
  ]);

  //완료 버튼이 눌리면 primary컬러로 바뀌도록 하는 state
  const [isClick, setIsClick] = useState(false);

  //완료버튼 눌렀을 시 다음페이지로 이동되는 함수
  const onAfterClick = () => {
    setIsClick(!isClick);
    router.push('/home');
  };
  //이전버튼 눌렀을 시 다음페이지로 이동되는 함수
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
              <div
                className="grid gap-y-2"
                ref={provided.innerRef}
                {...provided.droppableProps}

              >
                {certifications.map(({ id, title }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div className="w-full h-16 bg-gray0 rounded-full"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}>
                        <div>
                          <div className="flex items-center gap-x-3 p-2">
                            <div className="w-12 h-12 rounded-full bg-white">
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
      </ DoneButton>
    </div>
  );
};
export default CertificationPriority;
