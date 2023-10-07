import Link from 'next/link';
import React from 'react';

import { MENU_LIST } from '@/utils/nav';

export default function NavBar() {
  return (
    <div className="fixed bottom-0 flex justify-evenly items-center gap-[0.8rem]">
      {MENU_LIST.map((menu) => {
        return (
          <Link href={menu.path} key={menu.id}>
            {menu.name}
          </Link>
        );
      })}
    </div>
  );
}
