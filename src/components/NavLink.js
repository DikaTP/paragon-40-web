'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, showBadge, ...rest }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <span className='relative inline-flex'>
      <Link
        aria-current={isActive ? 'page' : undefined}
        className={clsx(
          'border rounded-full px-6 py-2 border-primary transition-colors text-center flex-grow',
          isActive
          ? 'bg-primary text-white'
          : 'text-primary'
        )}
        href={href}
        {...rest}
      />
      {showBadge && (
        <span className='absolute top-0 right-0 -mt-1 -mr-1 flex size-4'>
          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
        </span>
      )}
    </span>
  );
}