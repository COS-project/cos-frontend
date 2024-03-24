import React, { useState } from 'react';

interface GoalRunningGraphProps {
  maintitle: string;
  subtitle: string;
  goaltime: number;
  presenttime: number;
  unit: string;
}

interface HorizontalBarChartProps {
  score: number;
  total: number;
  unit: string;
}

const GoalRunningGraph: React.FC<GoalRunningGraphProps> = ({ maintitle, subtitle, goaltime, presenttime, unit }) => {
  return (
    <div>
      <div className="bg-white border border-gray0 rounded-3xl mt-[10%]">
        <div className="flex bg-gray0 rounded-3xl">
          <div className="w-[20%]">
            <div className="w-12 h-12 rounded-full bg-white m-2 flex items-center justify-center">
              <Logo />
            </div>
          </div>
          <div className="w-[65%] mx-auto flex flex-col justify-center">
            <div className="font-extrabold text-h4">
              {goaltime}
              {unit}
              {maintitle}
            </div>
            <div className="flex text-h6 space-between font-black">
              {subtitle}
              <div className={`ml-1 ${presenttime === 0 ? 'text-gray3' : 'text-second'}`}>
                {presenttime}
                {unit}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mx-auto">{'>'}</div>
        </div>
        <div className="flex w-[90%] mx-auto mt-[15%] mb-[5%] justify-center ">
          <HorizontalBarChart score={presenttime} total={goaltime} unit={unit} />
        </div>
      </div>
    </div>
  );
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ score, total, unit }) => {
  // Percentage calculation
  const percentage = Math.round((score / total) * 100);
  const widthPercentage = Math.max(0, percentage - 4);
  let iconComponent;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (percentage === 0) {
    iconComponent = <Logo />;
  } else if (percentage < 100) {
    iconComponent = <StopwatchIcon fillColor="#3D3BFF" />;
  } else {
    iconComponent = <Logo />;
  }

  return (
    <div className="w-[100%]">
      <div className="flex">
        <div className="bg-white h-1" style={{ width: `${widthPercentage}%` }}></div>
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {iconComponent}
          {isHovered && (
            <div
              className={
                'absolute bottom-full left-1/2 transform -translate-x-1/2 text-white px-[20%] bg-black rounded-lg mb-[10%]'
              }
              style={{ zIndex: 1, marginTop: '10px' }}>
              <div className="flex text-h6">
                <div>{percentage}</div>
                <div>{unit}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[50%]  relative mt-4">
        {/* Gray background */}
        <div className="bg-gray1 h-2 rounded-full"></div>

        {/* Blue bar */}
        <div
          className="absolute top-0 left-0 bg-second h-2 rounded-l-full rounded-r-full"
          style={{ width: `${percentage}%` }}></div>

        {/* Score and Total labels */}
        <div className="flex justify-end mt-2">
          <span className="text-gray4 text-h6">
            {total}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.337 15.454c-.984 2.495-3.412 4.27-6.253 4.27-3.709 0-6.724-3.017-6.724-6.721s3.015-6.721 6.724-6.721c2.84 0 5.272 1.772 6.253 4.27h5.577C22.775 5.061 17.904.924 12.08.924 5.42.924 0 6.34 0 13c0 6.659 5.42 12.076 12.081 12.076 5.823 0 10.694-4.137 11.83-9.625h-5.577l.003.003z"
        fill="#2B2B2B"
      />
    </svg>
  );
}

function StopwatchIcon(props: React.SVGProps<SVGSVGElement> & { fillColor: string }) {
  const { fillColor, ...rest } = props;

  return (
    <svg width={41} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <mask
        id="prefix__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={41}
        height={40}>
        <path fill="#6283FD" d="M.25 0h40v40h-40z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          d="M16.583 3.75a.494.494 0 01-.5-.507c0-.143.048-.262.144-.354a.493.493 0 01.356-.139h7.334a.494.494 0 01.5.507.472.472 0 01-.144.354.493.493 0 01-.356.139h-7.334zm3.674 18.639a.471.471 0 00.354-.144.493.493 0 00.139-.356v-7.25a.494.494 0 00-.507-.5.471.471 0 00-.354.144.493.493 0 00-.139.356v7.25a.494.494 0 00.507.5zM20.25 34.5a12.43 12.43 0 01-4.99-1.014 13.184 13.184 0 01-4.093-2.75 12.67 12.67 0 01-2.75-4.093c-.667-1.571-1-3.235-1-4.99 0-1.756.333-3.415 1-4.977a12.873 12.873 0 012.75-4.093 12.873 12.873 0 014.093-2.75 12.58 12.58 0 014.99-1c1.62 0 3.178.297 4.674.89a13.514 13.514 0 014.048 2.5l1.25-1.279a.546.546 0 01.34-.16c.135-.013.262.04.383.16.12.12.18.241.18.361s-.06.241-.18.362l-1.278 1.277a13.204 13.204 0 012.5 3.952c.61 1.486.916 3.076.916 4.77a12.61 12.61 0 01-1 4.977 12.668 12.668 0 01-2.75 4.093 13.183 13.183 0 01-4.093 2.75 12.43 12.43 0 01-4.99 1.014zm-.004-1c3.28 0 6.073-1.151 8.379-3.454 2.306-2.303 3.458-5.095 3.458-8.375 0-3.28-1.151-6.074-3.454-8.38-2.303-2.305-5.095-3.458-8.375-3.458-3.28 0-6.073 1.152-8.379 3.455-2.306 2.303-3.458 5.094-3.458 8.375 0 3.28 1.151 6.073 3.454 8.379 2.303 2.305 5.095 3.458 8.375 3.458z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}

export default GoalRunningGraph;
