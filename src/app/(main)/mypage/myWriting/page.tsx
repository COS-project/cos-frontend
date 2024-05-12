import NavBar from '@/components/common/NavBar';

export default function MyWriting() {
  return (
    <>
      <div className="w-full mt-2">
        <header className="flex justify-between items-center px-[1.25rem] py-[0.25rem] text-h4">
          <button>{'<'}</button>
          <div>내가 쓴 글</div>
          <button>검색</button>
        </header>
        <div className="flex justify-around mt-2">
          <button className="rounded-2xl border border-gray2 px-3 py-1 text-h6 focus:bg-black focus:text-white mx-1">
            따끈후기
          </button>
          <button className="rounded-2xl border border-gray2 px-3 py-1 text-h6 focus:bg-black focus:text-white mx-1">
            해설게시판
          </button>
          <button className="rounded-2xl border border-gray2 px-3 py-1 text-h6 focus:bg-black focus:text-white mx-1">
            꿀팁게시판
          </button>
          <button className="rounded-2xl border border-gray2 px-3 py-1 text-h6 focus:bg-black focus:text-white mx-1">
            자유게시판
          </button>
        </div>
      </div>

      <div className="w-full bg-gray1  mx-2 mt-3 px-3 py-3">
        <select className="rounded-xl text-h6 text-gray4">
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
        <div className="w-full bg-white rounded-lg mt-3 py-2">
          <div className="flex justify-around items-center px-3 py-[0.25rem]">
            <div className="text-h6">nickname</div>
            <div className="flex justify-between">
              <div className="rounded-2xl text-h6 border border-gray4 py-[2px] px-1 text-gray4 mx-2">
                준비기간 6개월 ↑
              </div>
              <div className="rounded-2xl text-h6 text-white bg-point py-[2px] px-1">조금 어려워요</div>
            </div>
          </div>
          <div>
            <div className="px-6 mt-2">
              <div className="text-h6 text-black">막 생각보다 어렵지는 않음</div>
              <div className="text-gray4 text-h7">작성일 2024.03.16</div>
            </div>
            <div className="flex justify-end mx-3 mt-2">
              <button className="rounded-xl bg-[#F0F0F0] px-3 py-2">수정</button>
              <button className="rounded-xl bg-black text-white px-3 py-2 ml-2">삭제</button>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
