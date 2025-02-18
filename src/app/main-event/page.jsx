"use client";

import { MapPinIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";

const schedules = ["07.30 WIB", "08.30 WITA & MYT", "09.30 WIT"];
const goods = ["Work ID", "Book", "Paper"];

export default function MainEventPage() {
  const t = useTranslations();

  return (
    <div className="flex-grow pb-8 bg-kv-2">
      <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
        <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
            <h1 className="text-lg lg:text-7xl font-bold">{t('MainEventPage.title')}</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]' />
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
        {/* Location */}
        <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <h2 className="text-4xl lg:text-6xl mb-5">LOCATION</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-full lg:col-span-1">
              <div className="h-72 lg:h-96 w-full rounded-xl bg-white"></div>
            </div>
            <div className="col-span-full lg:col-span-1 flex flex-col justify-between lg:p-8">
              <div className="mb-8">
                <div className="flex flex-row gap-5 mb-8">
                </div>
                <span className="font-semibold text-2xl text-white">
                  Will be located on your nearest Work Area
                </span>
              </div>
              <div className="flex flex-row gap-3 justify-around lg:justify-start items-center">
                <button className="flex flex-row gap-1 justify-center items-center rounded-full py-3 px-4 bg-purple-600 text-white text-sm">
                  <MapPinIcon className="size-5" />
                  Open Maps
                </button>
                <button className="flex flex-row gap-1 justify-center items-center rounded-full py-3 px-4 bg-orange-600 text-white text-sm">
                  <PlayCircleIcon className="size-5" />
                  Watch Livestream
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Do n Dont's */}
        {false && 
          <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-full lg:col-span-1">
                <h3 className="text-4xl lg:text-6xl text-white mb-8">Do</h3>
                <div className="grid grid-cols-2 gap-6 lg:px-6">
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <div className="bg-gray-300 size-10 lg:size-16"></div>
                        <span className="text-white text-xl lg:text-3xl">list {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-full lg:col-span-1">
                <h3 className="text-4xl lg:text-6xl text-white mb-8">Dont's</h3>
                <div className="grid grid-cols-2 gap-6 lg:px-6">
                  {Array.from({ length: 4 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <div className="bg-gray-300 size-10 lg:size-16"></div>
                        <span className="text-white text-xl lg:text-3xl">list {index + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-14">
              <h4 className="font-semibold text-3xl text-white mb-4">
                What to bring
              </h4>
              <div className="flex flex-row gap-3 items-center">
                {goods.map((item, index) => (
                  <div
                    className="flex border border-white py-1 px-3 rounded-full text-white"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
