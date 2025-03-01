"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function AboutPage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex-grow pb-8 bg-kv-2">
      <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
        <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
            <h1 className="text-lg lg:text-7xl font-bold">{t('AboutPage.title')}</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50px] lg:w-[200px]'/>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* <Image className="rounded-3xl w-full h-full col-span-4 lg:col-span-1" src="/dream_sm.png" alt="dream" width="300" height="500" /> */}
          <video loop controls className='rounded-3xl w-full h-full col-span-4 lg:col-span-1'>
            <source src="https://storage.googleapis.com/paragon-p40-cdn/movie/FINAL%20CAMPAIGN%20P40.mp4" type="video/mp4"/>
             Your browser does not support the video.
          </video>
          <div className="bg-kv-gradient col-span-4 lg:col-span-3 rounded-3xl">
            <div className="p-6 lg:p-8 text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-10">UNLOCKING<br />NEW THINKING</h1>
              <p className="text-base mb-5">{t('AboutPage.description1')}</p>
              <p className="text-base mb-5">{t("AboutPage.description2")}</p>
              <p className="text-base">{t("AboutPage.description3")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}