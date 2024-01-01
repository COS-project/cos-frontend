'use client';

import { forwardRef, useState } from 'react';

interface CertificationClassificationItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>{

}

const CertificationClassificationItem =
  forwardRef<HTMLButtonElement, CertificationClassificationItemProps>(({
                                                             children,
                                                             type = "button",
                                                             ...prop
                                                           }, ref)=> {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const onClick = () => {
      setIsCheck(!isCheck);
    };
    return (
      <button
        className={
          isCheck
            ? 'w-full h-16 bg-gray0 rounded-full border-[1px] border-second'
            : 'w-full h-16 bg-gray0 rounded-full '
        }
        ref={ref}
        onClick={onClick}
        type={type}
        {...prop}>
        <div className="flex items-center gap-x-3 p-2">
          <div className="w-12 h-12 rounded-full bg-white">
            {/*TODO: 아이콘*/}
            {isCheck ? <div>✅️</div> : <div>✔</div>}
          </div>
          <div className="text-h4 font-semibold">{children}</div>
        </div>
      </button>
    );
  },
);
  export default CertificationClassificationItem;
