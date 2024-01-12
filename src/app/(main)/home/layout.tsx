'use client';

import { useRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import { layoutState } from '@/recoil/atom';

export default function layout({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useRecoilState<'Home' | 'ExamInfo'>(layoutState);

  return (
    <div className="bg-gray0">
      {step == 'Home' ? (
        <div>
          <Header /> {children} <NavBar />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
