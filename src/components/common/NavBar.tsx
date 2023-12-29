import Link from 'next/link';
import React from 'react';

import { MENU_LIST } from '@/utils/nav';

export default function NavBar() {
  return (
    <div className="flex justify-center items-center">
      <div className="fixed bottom-0 flex justify-evenly items-center gap-[0.8rem] pb-[0.5rem]">
        {MENU_LIST.map((menu) => {
          return (
            <Link href={menu.path} key={menu.id}>
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
