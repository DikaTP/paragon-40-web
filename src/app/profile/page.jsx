"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="flex max-w-screen-2xl justify-between px-16">
          <div>
            <h1 className="text-7xl font-bold">PROFILE PAGE</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128"/>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-8 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full text-center">
            <a href="" className="text-3xl">{t('ProfilePage.description')}</a>
            <Image className="rounded-3xl my-4" src="/qr_example.png" alt="qr_code" width="300" height="500"/>
            <div className="text-start">
              <h1 className="text-2xl">Vincent Valerian</h1>
              <h1 className="text-2xl mt-4">vincent@paragon.id</h1>
              <h1 className="text-2xl mt-4">R$D Bussiness Development</h1>
              <h1 className="text-2xl mt-4">{t('ProfilePage.regionOffice')}: Jakarta</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}