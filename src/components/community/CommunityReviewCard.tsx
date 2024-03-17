const CommunityReviewCard = () => {
  return (
    <article className="w-full px-[2rem] py-[1.6rem] flex gap-[0.6rem] flex-col bg-white rounded-[3.2rem]">
      <section className="flex gap-[0.6rem] text-h6">
        <p>김형겸</p>
        <p>준비기간 6개월</p>
        <p>쉬워요</p>
      </section>
      <p className="text-h4">생각보다 어렵지는 않음</p>
      <p className="text-h6">작성일 2023.7.12</p>
    </article>
  );
};

export default CommunityReviewCard;
