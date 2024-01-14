'use client';

import Image from 'next/image';

const imageList: string[] = [
  'https://github.com/COS-project/cos-frontend/assets/97586683/740bcf82-d3f0-4b4a-a2f0-0eddd1c18e29',
  'https://github.com/COS-project/cos-frontend/assets/97586683/740bcf82-d3f0-4b4a-a2f0-0eddd1c18e29',
];

export default function CommunityDetailPage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Image
          src="https://github.com/COS-project/cos-frontend/assets/97586683/740bcf82-d3f0-4b4a-a2f0-0eddd1c18e29"
          alt="profile-image"
          width={40}
          height={40}
        />
        <div>
          <p>Hongu90</p>
          <div>
            <span>23.10.08</span>
            <span>16:30</span>
          </div>
        </div>
      </div>
      <section className="px-[2rem] mt-[0.9rem]">
        <h1>23번 꿀팁 가져가세요!!</h1>
        <p>이 문제 존나어려움</p>
      </section>
    </>
  );
}
