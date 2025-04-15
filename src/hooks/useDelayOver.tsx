import { useEffect, useState } from 'react';

const useDelayOver = (delayTime: number, data: any) => {
  const [isDelayOver, setIsDelayOver] = useState(false);

  useEffect(() => {
    if (data) {
      // data가 생기면 즉시 true
      setIsDelayOver(true);
    } else {
      // data가 없으면 delay 이후 true
      setIsDelayOver(false); // reset
      const timer = setTimeout(() => {
        setIsDelayOver(true);
      }, delayTime);

      return () => clearTimeout(timer); // cleanup
    }
  }, [data, delayTime]);

  return isDelayOver;
};

export default useDelayOver;
