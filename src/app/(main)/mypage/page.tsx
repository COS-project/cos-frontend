import React from 'react';
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';

export default function MyPage() {
  return (
    <>
      <div className="w-[371.15px]">
        <Header />
      </div>
      <div className="flex justify-start items-center mx-2">
        <img src="" alt="없음" className="w-16 h-16 bg-gray4 object-cover rounded-full" />
        <span className="text-h4 ml-3">nickname ></span>
      </div>
      <div className="mt-3 flex justify-between mx-2">
        <div className="font-bold">
          나의 관심 종목
        </div>
        <button className="text-h6 text-gray3">
          변경 >
        </button>
      </div>
      <div className="w-[317.15px] flex justify-between mt-3 mx-2 overflow-hidden">
        <div className="px-3 py-4 rounded-lg text-white text-h7 bg-primary">컴퓨터 활용능력 2급</div>
        <div className="px-3 py-4 rounded-lg text-white text-h7 bg-primary">컴퓨터 활용능력 2급</div>  
              </div>

      <NavBar />
    </>
  );
}
