import React from 'react';

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
}

const GoalRunningGraph: React.FC<GoalRunningGraphProps> = ({ maintitle, subtitle, goaltime, presenttime, unit }) => {
  return (
    <div>
      <div className="bg-white border border-gray0 rounded-3xl mt-[10%]">
        <div className="flex bg-gray0 rounded-3xl">
          <div className="w-12 h-12 rounded-full bg-white m-2"></div>
          <div className="flex flex-col justify-center">
            <div className="font-extrabold text-h4">
              {goaltime}
              {unit}
              {maintitle}
            </div>
            <div className="flex text-h6 space-between">
              {subtitle}
              <div className="text-second ml-1">
                {presenttime}
                {unit}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mx-auto">{'>'}</div>
        </div>
        <div className="flex w-[90%] mt-[20%] mx-auto justify-center my-2">
          <HorizontalBarChart score={presenttime} total={goaltime} />
        </div>
      </div>
    </div>
  );
};

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ score, total }) => {
  // Percentage calculation
  const percentage = (score / total) * 100;

  return (
    <div className="w-[100%] ">
      <div className="flex">
        <div className="bg-white h-1" style={{ width: `${percentage - 4}%` }}></div>
        <div className="w-5 h-5 bg-second rounded-full"></div>
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
          <span className="text-gray3">{total}분 </span>
        </div>
      </div>
    </div>
  );
};

export default GoalRunningGraph;
