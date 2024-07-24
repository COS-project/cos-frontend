import React, { useEffect, useState } from 'react';

interface StickGraphProps {
  height: number;
  color: string;
  totalTakenTime: number;
}

const StickGraph: React.FC<StickGraphProps> = ({ height, color, totalTakenTime }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverColor = 'primary';
  const defaultColor = color;

  return (
    <div
      style={{ height: height != null ? `${(height / totalTakenTime) * 100}%` : 'auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[20%] mt-auto bg-${isHovered ? hoverColor : defaultColor} rounded-t-full`}>
      {height != null && isHovered && (
        <div>
          <div
            className={
              'absolute bottom-full left-1/2 transform -translate-x-1/2 text-white px-[80%] bg-black rounded-lg mb-[40%]'
            }
            style={{ zIndex: 1, marginTop: '10px' }}>
            {height}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickGraph;
