import { useEffect, useState } from 'react';

const useDelayOver = (delayTime: number) => {
  const [isDelayOver, setIsDelayOver] = useState(false); // ⏱ 0.5초 타이머용

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayOver(true);
    }, delayTime);

    return () => clearTimeout(timer);
  }, []);

  return [isDelayOver];
};
export default useDelayOver;
