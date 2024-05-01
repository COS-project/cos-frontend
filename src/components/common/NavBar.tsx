import Link from 'next/link';
import React from 'react';

import { MENU_LIST } from '@/utils/common/nav';

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 flex w-full justify-center rounded-t-[3.2rem] items-center gap-[0.8rem] pb-[2rem] pt-[0.8rem] bg-white">
      {MENU_LIST.map((menu) => {
        return (
          <Link href={menu.path} key={menu.id} className="w-[4rem] flex flex-col justify-center items-center">
            <menu.Icon />
            <span className="whitespace-nowrap text-h7 text-gray4">{menu.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
