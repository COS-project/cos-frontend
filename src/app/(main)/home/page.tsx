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
        <CorrectRateGraphBox />
        <StayTimeGraphBox />
      </div>
    </div>
  );
}

const GoalBox = () => {
  return (
    <div>
      <div className="mx-auto mt-2 rounded-3xl bg-white py-[3%]">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-[3%]">
            <div className="font-bold text-h3">목표 달성</div>
            <div className="w-[29%] border border-gray2 flex items-center justify-center rounded-l-full rounded-r-full  text-h6">
              목표수정 ⬈
            </div>
          </div>
          <div className="flex justify-evenly space-x-2">
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full font-black px-4 my-2 text-h6 py-[3%]">
                  목표점수
                </div>
              </div>
              <div className="relative">
                <ScoredDonutChart mainscore={30} totalscore={100} unit="점" />
              </div>
            </div>
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full  font-black px-4 my-2 text-h6 py-[3%]">
                  공부시간
                </div>
              </div>
              <div className="relative">
                <ScoredDonutChart mainscore={60} totalscore={100} unit="분" />
              </div>
            </div>
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full  font-black px-4 my-2 text-h6 py-[3%]">
                  모의고사
                </div>
              </div>
              <div className="relative">
                <ScoredDonutChart mainscore={10} totalscore={30} unit="회" />
              </div>
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
      <div className="mx-auto mt-2 rounded-3xl bg-white py-[3%]">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-[3%]">
            <div className="flex w-[70%] space-x-[1%]">
              <div className="w-[40%] font-bold text-h3">오늘 목표</div>
              <div className="w-[40%] flex bg-gray0 items-center justify-center text-second text-h6 font-bold rounded">
                목표 진행중
              </div>
            </div>
            <div className="w-[30%] border border-gray2 flex items-center justify-center rounded-l-full rounded-r-full text-h6">
              목표수정 ⬈
            </div>
          </div>
          <GoalRunningGraph
            maintitle=" 공부하기"
            subtitle="오늘 공부한 시간"
            goaltime={60}
            presenttime={59}
            unit="분"
          />
          <GoalRunningGraph
            maintitle="분 모의고사 풀기"
            subtitle="오늘 푼 모의고사"
            goaltime={3}
            presenttime={0}
            unit="회"
          />
        </div>
      </div>
    </div>
  );
};

const CorrectRateGraphBox = () => {
  const subjects = [
    { name: 'Math', correctAnswer: 75, totalProblems: 100 },
    { name: 'Science', correctAnswer: 60, totalProblems: 80 },
    { name: 'History', correctAnswer: 40, totalProblems: 60 },
    // ... 다른 과목들
  ];
  return (
    <div className="mx-auto mt-2 rounded-3xl bg-white py-[6%]">
      <div className="w-[90%] mx-auto">
        <CorrectRateGraph subjects={subjects} />
      </div>
    </div>
  );
};

const StayTimeGraphBox = () => {
  return (
    <div>
      <div className="mx-auto mt-2 rounded-3xl bg-white py-[6%]">
        <div className="w-[90%] mx-auto">
          <StayTimeGraph
            title="머문시간"
            takenTime={180}
            maxTime={100}
            subjectTime={[50, 60, 70]}
            subjectName={['이산수학', '자료구조', '운영체제']}
          />
        </div>
      </div>
    </div>
  );
};
