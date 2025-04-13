const SkeletonSubjectCard = () => {
  return (
    <div className="flex flex-col gap-y-4 p-3 border-[1px] border-gray2 rounded-[32px]">
      <div className="font-semibold text-center pb-2 border-b border-gray1 animate-pulse" />
      <div>
        <div className="text-black text-center text-h7">최근 점수</div>
        <ul className="flex items-end justify-center">
          <li className="font-bold text-h2 animate-pulse" />
          <div className="mb-[3px] text-gray3 text-h6 animate-pulse" />
        </ul>
      </div>
      <button className="w-full bg-gray0 rounded-3xl py-3 text-h6">시험 보기</button>
    </div>
  );
};
export default SkeletonSubjectCard;
