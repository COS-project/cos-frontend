import NavBar from '@/components/common/NavBar';

export default function MyComment() {
  return (
    <>
      <div className="w-full mt-2">
        <header className="flex justify-between items-center px-[1.25rem] py-[0.25rem] text-h4">
          <a href="../mypage">{'<'}</a>
          <div>내가 쓴 댓글</div>
          <div>...</div>
        </header>
      </div>

      <div className="w-full bg-gray1 mt-3 px-3 py-3 min-h-screen">
        <select className="rounded-2xl text-h6 text-gray4">
          <option key="all" value="all">
            전체
          </option>
          <option key="new" value="new">
            최신순
          </option>
          <option key="old" value="old">
            작성순
          </option>
        </select>
        {/* 여기가 박스안에 내용들 담아놓은곳 아래.. */}
        <div className="w-full bg-white rounded-2xl mt-3 py-2">
          <div className="flex justify-between px-3 py-[0.25rem]">
            <div className="text-h6 ml-3">nickname</div>
            <div className="flex justify-between">
              <div className="rounded-2xl text-h6 border border-gray4 py-[2px] px-1 text-gray4 mx-2">
                준비기간 6개월 ↑
              </div>
              <div className="rounded-2xl text-h6 text-white bg-point py-[2px] px-1">조금 어려워요</div>
            </div>
          </div>
          <div>
            <div className="px-6 mt-2">
              <div className="text-h3">여기에는 제목이 들어갈거고</div>
              <div className="text-h6 text-black">여기에는 내용이 들어갈거고</div>
              <div className="text-h7"> 여기에 좋아요랑 댓글 수가 들어갈거고.</div>
              <div className="text-gray4 text-h7">작성일 2024.03.16</div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
