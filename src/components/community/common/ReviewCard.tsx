import { Difficulty } from '@/types/global';

interface Review {
  userName: string;
  preparationPeriod: string;
  difficulty: Difficulty;
  comment: string;
  createdAt: string;
}

const reviewDummyData: Review[] = [
  {
    userName: '황유림',
    preparationPeriod: '3개월',
    difficulty: '조금 어려워요',
    comment: '막 생각보다 엄청 어렵지는 않은데, 그래도 못풀겠음..ㅠㅠ',
    createdAt: '2024.01.14',
  },
  {
    userName: '김형겸',
    preparationPeriod: '1개월',
    difficulty: '어려워요',
    comment: '뭐가 안어렵다는거야 어려워 죽을 것 같아요 어떻게 풀어야 할지 감도 안 오네요',
    createdAt: '2024.01.14',
  },
  {
    userName: '김범규',
    preparationPeriod: '6개월',
    difficulty: '보통이에요',
    comment: '막 생각보다 엄청 어렵지는 않음',
    createdAt: '2024.01.14',
  },
  {
    userName: '이상호',
    preparationPeriod: '7개월',
    difficulty: '쉬워요',
    comment: '난 쉬웟음',
    createdAt: '2024.01.14',
  },
  {
    userName: '박순영',
    preparationPeriod: '3',
    difficulty: '너무 쉬워요',
    comment: '너무 쉬워서 10분만에 다풀고 잠',
    createdAt: '2024.01.14',
  },
];

export default function ReviewCard() {
  return (
    <main className="flex flex-col gap-[1.6rem]">
      {reviewDummyData.map((content, index) => {
        const { userName, preparationPeriod, difficulty, comment, createdAt } = content;

        return (
          <article key={index} className="flex flex-col px-[20px] py-[16px] gap-[12px] bg-white rounded-[32px]">
            <div className="flex items-center">
              <p className="text-h5 text-gray4">{userName}</p>
              <p className="px-[10px] py-[2px] mx-[6px] border-2 rounded-full border-gray2 text-gray4">
                준비기간 {preparationPeriod}
              </p>
              <p>{difficulty}</p>
            </div>
            <section className="flex flex-col gap-[4px]">
              <h1 className="text-h4">{comment}</h1>
              <h2 className="text-h5 text-gray3">작성일 {createdAt}</h2>
            </section>
          </article>
        );
      })}
    </main>
  );
}
