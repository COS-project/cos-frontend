'use client';

import DonutChart from '@/components/home/goal-attaining/donutchart';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray2 items-center h-screen">
      <GoalBox />
    </div>
  );
}

const GoalBox = () => {
  const chartData = [40, 60]; // 예시 데이터

  return (
    <div>
      <div className="mx-auto mt-4 w-[90%] p-3 rounded-3xl bg-white">
        <div className="flex justify-between">
          <div>목표 달성</div> <div>목표 달성</div>
        </div>
        <div className="flex justify-evenly">
          <div className="relative w-[30%]">
            <DonutChart data={chartData} />
            {/* 가운데에 위치할 텍스트 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-black text-lg font-bold">65점/100점</p>
            </div>
          </div>
          <div className="relative w-[30%]">
            <DonutChart data={chartData} />
            {/* 가운데에 위치할 텍스트 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-black text-lg font-bold">Your Text Here</p>
            </div>
          </div>
          <div className="relative w-[30%]">
            <DonutChart data={chartData} />
            {/* 가운데에 위치할 텍스트 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-black text-lg font-bold">Your Text Here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
