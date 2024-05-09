import { ReactNode } from 'react';

interface Props {
  time: string;
  contentElement: ReactNode;
  moveButton?: ReactNode;
}
const AlarmItem = (props: Props) => {
  const { time, moveButton, contentElement } = props;
  return (
    <div className={'flex flex-col gap-y-1 bg-white rounded-[32px] py-4 px-5'}>
      <span className={'text-h6 text-gray3'}>{time}</span>
      {contentElement}
      {moveButton ? moveButton : null}
    </div>
  );
};
export default AlarmItem;
