"use client"

import { useTranslations } from 'next-intl';
import LocaleSwitch from '@/components/LocaleSwitch';
import NavLink from '@/components/NavLink';
import ListItems from '@/components/ListItems';
import AddItem from '@/components/AddItems';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function HomePage() {
  const t = useTranslations();
  const s = useSession()

  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="mx-auto flex max-w-screen-2xl items-end justify-between py-4 px-16 mb-8">
          <Image src="/p40-logo.png" alt="logo" width="100" height="67" />
          <nav className="flex gap-6">
            <NavLink href="/home">{t('home')}</NavLink>
            <NavLink href="/profile">{t('profile')}</NavLink>
          </nav>
          <div className="flex items-center">
            <LocaleSwitch />
          </div>
        </div>
      </div>
      <div className="flex max-w-screen-2xl justify-between py-4 px-16">
        <div>
          <h1 className="text-7xl font-bold">Lets Begin at 40!</h1>
          <h2 className="text-5xl">Welcome, username</h2>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" />
        </div>
      </div>
      <div className="flex max-w-screen-2xl py-4 px-16 gap-4">
        <div className='bg-[#0321FF] py-4 px-8 rounded-full text-white'>
          <span className='font-bold'>Pre-Event</span> | 1-27 Februari 2025
        </div>
        <div className='bg-[#0321FF] py-4 px-8 rounded-full text-white'>
          <span className='font-bold'>Main-Event</span> | 28 Februari 2025
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-2xl grow flex-col py-10">
      </div>
    </div>
  );
}