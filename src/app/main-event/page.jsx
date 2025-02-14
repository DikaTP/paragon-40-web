"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const schedules = ["07.30 WIB", "08.30 WITA & MYT", "09.30 WIT"];

export default function MainEventPage() {
  const t = useTranslations();

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">{t('MainEventPage.title')}</h1>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col justify-between col-span-full lg:col-span-1">
            <div className="flex flex-col gap-3 mb-8">
              <span className="font-medium text-6xl max-w-xs">
                COMING SOON
              </span>
              <span className="font-semibold text-base">
                See you on February 28th, 2025 !
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-base">
                Offline in each Work Area
              </span>
              <div className="flex flex-row gap-4 items-center flex-wrap">
                {schedules.map((item, index) => (
                  <div
                    className="flex border border-white py-1 px-3 rounded-full text-nowrap"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl col-span-full lg:col-span-1">
            <Image
              src={"/kita-sekarang-karena-kita-kemarin.png"}
              alt="Kita Sekarang Karena Kita Kemarin"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
