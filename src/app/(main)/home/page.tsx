'use client';

import CorrectRateGraph from '@/components/exam/CorrectRateGraph';
import StayTimeGraph from '@/components/exam/StayTimeGraph';
import GoalRunningGraph from '@/components/home/goal-attaining/GoalRunningGraph';
import GrowthGraph from '@/components/home/goal-attaining/GrowthGraph';
import ScoredDonutChart from '@/components/home/goal-attaining/ScoredDonutChart';

import * as React from 'react';

export default function Home() {
  return (
    <div className="bg-gray0 items-center h-screen overflow-y-auto">
      <div>.</div>
      <div className="w-[85%] mx-auto">
        <GoalBox />
        <TodayGoalBox />
        <GrowthGraphBox />
        <CorrectRateGraphBox />
        <StayTimeGraphBox />
      </div>
    </div>
  );
}

const GoalBox = () => {
  return (
    <div>
      <div className="mx-auto mt-2 p-3 rounded-3xl bg-white">
        <div className="flex justify-between my-3">
          <div className="font-bold text-h3 mx-2">목표 달성</div>
          <div className="border border-gray2 rounded-l-full rounded-r-full px-2 text-h6">목표수정</div>
        </div>
        <div className="flex justify-evenly space-x-2">
          <div className="w-[33%]">
            <div className="flex justify-center items-center">
              <div className="bg-gray1 rounded-l-full rounded-r-full px-2 font-black px-4 my-2 text-h6">목표점수</div>
            </div>
            <div className="relative">
              <ScoredDonutChart mainscore={30} totalscore={100} main="61점" total="100점" />
            </div>
          </div>
          <div className="w-[33%]">
            <div className="flex justify-center items-center">
              <div className="bg-gray1 rounded-l-full rounded-r-full px-2 font-black px-4 my-2 text-h6">공부시간</div>
            </div>
            <div className="relative">
              <ScoredDonutChart mainscore={60} totalscore={100} main="61점" total="100점" />
            </div>
          </div>
          <div className="w-[33%]">
            <div className="flex justify-center items-center">
              <div className="bg-gray1 rounded-l-full rounded-r-full px-2 font-black px-4 my-2 text-h6">모의고사</div>
            </div>
            <div className="relative">
              <ScoredDonutChart mainscore={60} totalscore={100} main="61점" total="100점" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TodayGoalBox = () => {
  return (
    <div>
      <div className="mx-auto mt-4 p-3 rounded-3xl bg-white">
        <div className="flex justify-between my-3">
          <div className="font-bold text-h3 mx-2">오늘 목표</div>
          <div className="border border-gray2 rounded-l-full rounded-r-full px-2 text-h6">목표수정</div>
        </div>
        <GoalRunningGraph maintitle=" 공부하기" subtitle="오늘 공부한 시간" goaltime={60} presenttime={30} unit="분" />
        <GoalRunningGraph
          maintitle="분 모의고사 풀기"
          subtitle="오늘 푼 모의고사"
          goaltime={3}
          presenttime={0}
          unit="회"
        />
      </div>
    </div>
  );
};

const GrowthGraphBox = () => {
  return (
    <div>
      <div className="mx-auto mt-4  p-3 rounded-3xl bg-white">
        <div className="flex justify-between my-3">
          <div className="font-bold text-h3 mx-2">성장그래프</div>
          <div className="border border-gray2 rounded-l-full rounded-r-full px-2 text-h6">자세히</div>
        </div>
        <GrowthGraph />
      </div>
    </div>
  );
};

const CorrectRateGraphBox = () => {
  return (
    <div>
      <div className="mx-auto mt-4  rounded-full bg-white">
        <CorrectRateGraph />
      </div>
    </div>
  );
};

const StayTimeGraphBox = () => {
  return (
    <div>
      <div className="mx-auto mt-4  rounded-full bg-white">
        <StayTimeGraph />
      </div>
    </div>
  );
};
