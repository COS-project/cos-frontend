'use client';

import CorrectRateGraph from '@/components/exam/CorrectRateGraph';
import StayTimeGraph from '@/components/exam/StayTimeGraph';
import GoalRunningGraph from '@/components/home/goal-attaining/GoalRunningGraph';
import ScoredDonutChart from '@/components/home/goal-attaining/ScoredDonutChart';

import * as React from 'react';

export default function Home() {
  return (
    <div className="bg-gray0 items-center h-screen overflow-y-auto">
      <div className="w-[90%] mx-auto">
        <DayBox />
        <GoalBox />
        <TodayGoalBox />
        <CorrectRateGraphBox />
        <StayTimeGraphBox />
        <StayTimeGraphBox />
      </div>
    </div>
  );
}

const DayBox = () => {
  return (
    <div className="my-5">
      <div className="flex">
        <div>
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
            {/* 내용을 추가할 수도 있습니다. */}
          </div>
        </div>
        <div className="w-[80%]">
          <div className="w-full h-16 bg-primary rounded-full flex items-center justify-evenly">
            <div>
              <div className="text-white font-bold text-h5">안녕하세요, 코어님</div>
              <div className="text-white font-bold text-h7">목표 달성까지 D-29일 남았어요!</div>
            </div>
            <div className="text-white font-bold text-h7">：</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GoalBox = () => {
  return (
    <div>
      <div className="mx-auto mt-2 rounded-3xl bg-white py-[3%]">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-[1%]">
            <div className="font-bold text-h3">목표 달성</div>
            <div className="w-[29%] border border-gray2 flex items-center justify-center rounded-l-full rounded-r-full text-h6 ">
              목표수정 ⬈
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full font-black px-4 my-2 text-h6 py-[3%]">
                  목표점수
                </div>
              </div>
              <div className="relative">
                <ScoredDonutChart mainscore={80} totalscore={100} unit="점" />
              </div>
            </div>
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full font-black px-4 my-2 text-h6 py-[3%]">
                  공부시간
                </div>
              </div>
              <div className="relative">
                <ScoredDonutChart mainscore={80} totalscore={100} unit="분" />
              </div>
            </div>
            <div className="w-[33%]">
              <div className="flex justify-center items-center">
                <div className="bg-gray0 rounded-l-full rounded-r-full font-black px-4 my-2 text-h6 py-[3%]">
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
      <div className="mx-auto mt-5 rounded-3xl bg-white py-[3%]">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-between my-[1%]">
            <div className="flex w-[70%] space-x-[1%]">
              <div className="w-[40%] font-bold text-h3">오늘 목표</div>
              <div className="w-[40%] flex bg-gray0 items-center justify-center text-primary text-h6 font-bold rounded">
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
            presenttime={50}
            unit="분"
          />
          <GoalRunningGraph
            maintitle="분 모의고사 풀기"
            subtitle="오늘 푼 모의고사"
            goaltime={3}
            presenttime={2}
            unit="회"
          />
        </div>
      </div>
    </div>
  );
};

const CorrectRateGraphBox = () => {
  const subjects = [
    { name: '컴퓨터 일반', correctAnswer: 75, totalProblems: 100 },
    { name: '스프레드시트', correctAnswer: 60, totalProblems: 80 },
    { name: '데이터베이스', correctAnswer: 30, totalProblems: 60 },

    // ... 다른 과목들
  ];
  return (
    <div className="mx-auto mt-5 rounded-3xl bg-white py-[5%]">
      <div className="w-[95%] mx-auto">
        <CorrectRateGraph subjects={subjects} />
      </div>
    </div>
  );
};

const StayTimeGraphBox = () => {
  return (
    <div>
      <div className="mx-auto mt-5 rounded-3xl bg-white py-[5%]">
        <div className="w-[90%] mx-auto">
          <StayTimeGraph
            title="머문시간"
            takenTime={180}
            maxTime={100}
            subjectTime={[50, 60, 70]}
            subjectName={['컴퓨터 일반', '스프레드시트', '데이터베이스']}
          />
        </div>
      </div>
    </div>
  );
};
