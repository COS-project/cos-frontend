import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <NavBar />
    </div>
  );
}
