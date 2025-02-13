'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, ...rest }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
    aria-current={isActive ? 'page' : undefined}
    className={clsx(
      'border rounded-full px-6 py-2 border-primary transition-colors text-center',
      isActive
      ? 'bg-primary text-white'
      : 'text-primary'
    )}
    href={href}
    {...rest}
    />
  );
}