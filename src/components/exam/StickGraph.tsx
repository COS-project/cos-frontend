import React, { useEffect, useState } from 'react';

interface StickGraphProps {
  height: number | null | undefined;
  color: string;
  maxNumber: number | undefined | null;
  width?: number;
}

const StickGraph: React.FC<StickGraphProps> = ({ height, color, maxNumber, width }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverColor = 'primary';

  return (
    <div
      style={{
        width: width ? `${width}%` : '30%',
        height:
          height !== null && height !== undefined && maxNumber !== undefined && maxNumber !== null
            ? maxNumber !== 0
              ? `${(Math.min(height) / maxNumber) * 100}%` // 최대 132%로 제한
              : `${Math.min(height) * 100}%`
            : 'auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative mt-auto bg-${isHovered ? hoverColor : color} rounded-t-full`}>
      {height != null && isHovered && (
        <div>
          <div
            className={
              'absolute bottom-full left-1/2 transform -translate-x-1/2 text-white px-[80%] bg-black rounded-lg mb-[40%]'
            }
            style={{ zIndex: 1, marginTop: '10px' }}>
            {height !== 0 ? height : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickGraph;
