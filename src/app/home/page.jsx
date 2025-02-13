"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function HomePage() {
  const t = useTranslations();
  const s = useSession();

  return (
    <div className="flex grow flex-col">
      
      <div className="flex max-w-screen-2xl justify-between py-4 px-4 lg:px-16">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">{t('HomePage.welcomeMessage')}</h1>
          <h2 className="lg:text-5xl">{t('HomePage.welcome')}, {s.data.user?.name || ''}</h2>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>
      <div className="flex max-w-screen-2xl py-4 px-4 lg:px-16 gap-2 lg:gap-4 text-xs lg:text-base">
        <div className='bg-[#0321FF] py-4 px-4 lg:px-8 rounded-full text-white'>
          <span className='font-bold'>Pre-Event</span> | 1-27 Feb 2025
        </div>
        <div className='bg-[#0321FF] py-4 px-4 lg:px-8 rounded-full text-white'>
          <span className='font-bold'>Main-Event</span> | 28 Feb 2025
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-2xl grow flex-col py-10">
      </div>
    </div>
  );
}