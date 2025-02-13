"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function AboutPage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="flex max-w-screen-2xl justify-between px-16">
          <div>
            <h1 className="text-7xl font-bold">{t('AboutPage.title')}</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128"/>
          </div>
        </div>
        
        <div className="mx-auto max-w-screen py-4 px-16 mt-8">
          <div className="mr-5">
            <Image className="rounded-3xl w-full h-full" src="/dream_sm.png" alt="dream" width="300" height="500" />
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-8">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-200 to-fuchsia-200 h-full text-white">
            <h1 className="text-6xl font-bold mb-5">UNLOCK</h1>
            <h1 className="text-6xl font-bold mb-10">NEW THINKING</h1>
            <p className="text-base mb-5">{t('AboutPage.description1')}</p>
            <p className="text-base mb-5">{t("AboutPage.description2")}</p>
            <p className="text-base">{t("AboutPage.description3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}