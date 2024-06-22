'use client'
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';

export default function Alarm() {
  return (
    <>
      <Header headerType={'dynamic'} title={'알림'}></Header>
      <div className="w-full mt-2">
        <div className="w-full bg-gray0  mx-2 mt-3 px-3 py-3">
          {/* 여기가 박스안에 내용들 담아놓은곳 아래.. */}
          <div className="w-full bg-white rounded-xl mt-3 px-3 py-2">
            <div>
              <div className="text-h6 text-gray2">10분전</div>
              <div className="px-1 mt-1">
                <div className="text-h6 text-black w-[300px]">
                  관심자격증 <b>정보처리기사</b> 후기를 작성해주세요!
                </div>
                <button className="border border-gray2 rounded-2xl text-h7 px-[6px]">따끈후기 작성하기{'>'}</button>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-xl mt-3 px-3 py-2">
            <div className="text-h6 text-gray2">1시간전</div>
            <div className="px-1 mt-1">
              <div className="text-h6 text-black w-[300px]">
                오늘의 목표 를 달성해볼까요?
              </div>
              <button className="border border-gray2 rounded-2xl text-h7 px-[6px]">모의고사보기{'>'}</button>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
