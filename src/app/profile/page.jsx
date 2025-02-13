"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">PROFILE</h1>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <a href="" className="text-xl lg:text-4xl font-bold">{t('ProfilePage.description')}</a>
        <div className="grid grid-cols-2">
          <Image className="rounded-3xl my-4 col-span-full lg:col-span-1 mx-auto" src="/qr_example.png" alt="qr_code" width="300" height="500"/>
          <div className="flex flex-col gap-2 text-start col-span-full lg:col-span-1 justify-center">
            <p className="text-base lg:text-2xl font-bold">Vincent Valerian</p>
            <p className="text-base lg:text-2xl">vincent@paragon.id</p>
            <p className="text-base lg:text-2xl">R$D Bussiness Development</p>
            <p className="text-base lg:text-2xl">{t('ProfilePage.regionOffice')}: Jakarta</p>
          </div>
        </div>
      </div>
    </div>
  );
}