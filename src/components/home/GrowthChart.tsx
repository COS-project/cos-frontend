'use client';

import { useState } from 'react';
import { useRecoilState } from 'recoil';

import StickGraph from '@/components/exam/StickGraph';
import { selectedReportTypeState } from '@/recoil/home/atom';
import FilterModal from '@/components/common/FilterModal';

const GrowthChart = () => {
  const [selectedReportType, setSelectedReportType] = useRecoilState<'WEEK' | 'MONTH' | 'YEAR'>(
    selectedReportTypeState,
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <div className="bg-white rounded-[32px] p-4 border-[1px] border-gray2">
        <div className="font-bold text-h3">성장그래프</div>

        {/*주간, 월간, 연간 필터 session*/}
        <div className={'flex w-[100%] justify-evenly rounded-[12px] border-[1px] border-gray1'}>
          <div
            onClick={() => setSelectedReportType('WEEK')}
            className={
              selectedReportType === 'WEEK'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            주간
          </div>
          <div
            onClick={() => setSelectedReportType('MONTH')}
            className={
              selectedReportType === 'MONTH'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            월간
          </div>
          <div
            onClick={() => setSelectedReportType('YEAR')}
            className={
              selectedReportType === 'YEAR'
                ? 'flex px-8 py-1 w-full border-[1px] border-gray1 justify-center items-center rounded-[12px] bg-gray0'
                : 'flex px-8 py-1 w-full justify-center items-center rounded-[12px] text-gray4'
            }>
            연간
          </div>
        </div>

        {/*  */}
        <div className={'flex text-h6 gap-x-1'}>
          <div onClick={() => setIsFilterOpen(!isFilterOpen)} className={'flex'}>
            <div>2월 1주</div>
            {isFilterOpen ? <DropUpIcon /> : <DropDownIcon />}
          </div>
          {/*{isFilterOpen ? <FilterModal />}*/}
          <div>평균 점수</div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="w-[86%] border-t border-gray1"></div>
          <div className="text-gray3 text-h5">100점</div>
        </div>

        <div className="flex items-end">
          <div className="w-[100%] justify-between">
            <div className="flex h-32">
            <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
              <div className="w-full flex justify-center">
                <StickGraph height={50} color="blue" />
              </div>
            </div>
            <div className="border-t border-gray1"></div>
          </div>
          <div className="w-[15%] text-gray3 text-h5">0점</div>
        </div>
        <div className="flex w-[102%] justify-between">
          <div className="w-[85%] flex justify-between">
            <div className="w-full flex justify-center text-h6">{'월'}</div>
            <div className="w-full flex justify-center text-h6">{'화'}</div>
            <div className="w-full flex justify-center text-h6">{'수'}</div>
            <div className="w-full flex justify-center text-h6">{'목'}</div>
            <div className="w-full flex justify-center text-h6">{'금'}</div>
            <div className="w-full flex justify-center text-h6">{'토'}</div>
            <div className="w-full flex justify-center text-h6">{'일'}</div>
          </div>
          <div className="w-[15%] text-white text-h5">0분</div>
        </div>
      </div>
    </div>
  );
};
export default GrowthChart;

function DropDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.654 9l-3.5 3-3.5-3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
function DropUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.654 12l3.5-3 3.5 3" stroke="#0D0E10" strokeLinecap="round" />
    </svg>
  );
}
