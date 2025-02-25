"use client";

import { BookOpenIcon, CheckCircleIcon, MapPinIcon, PlayCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider";

const schedules = ["07.30 WIB", "08.30 WITA & MYT", "09.30 WIT"];
const goods = ["Work ID", "Book", "Paper"];

export default function MainEventPage() {
  const t = useTranslations();
  const authUser = useContext(UserContext)

  return (
    <div className="flex-grow pb-8 bg-kv-2">
      <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
        <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
            <h1 className="text-lg lg:text-7xl font-bold">{t('MainEventPage.title')}</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50px] lg:w-[200px]' />
          </div>
        </div>
        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col justify-between col-span-full lg:col-span-1 lg:p-6 lg:pl-10">
              <div className="flex flex-col gap-3 mb-8">
                <span className="font-medium text-6xl max-w-xs">
                  COMING <span className="text-stroke">SOON</span>
                </span>
                <span className="font-semibold text-xl">
                  {t("MainEventPage.seeYou")}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-base">
                  {t("MainEventPage.offlineArea")}
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
        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <h2 className="text-4xl lg:text-6xl mb-5">{t('MainEventPage.location')}</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-full lg:col-span-1">
              <div className="border-white border-4 rounded-xl py-4">
                <p className="text-center text-3xl mb-2">Indonesia</p>
                <div className="grid grid-cols-2 gap-8 p-4 items-center content-center ">
                  <Image src="/xxi.webp" width={450} height={180} className="mx-auto lg:max-w-40" />
                  <Image src="/cgv.webp" width={450} height={199} className="mx-auto lg:max-w-40" />
                  <Image src="/sams-logo.webp" width={800} height={591} className="mx-auto lg:max-w-40" />
                  <div className="text-center">
                    <p className="text-2xl">{t('MainEventPage.otherVenue')}</p>
                    <p>{t('MainEventPage.otherVenueDesc')}</p>
                  </div>
                </div>
                <p className="text-center text-3xl mb-4">Malaysia</p>
                <div className="flex justify-center">
                  <Image src="/rexkl.webp" width={320} height={320} className="mx-auto max-w-28 lg:max-w-32" />
                </div>

              </div>
            </div>
            <div className="col-span-full lg:col-span-1 flex flex-col justify-between lg:p-4">
              <div className="mb-8">
                <div className="flex flex-row gap-5 mb-8">
                </div>
                <span className="font-semibold text-2xl text-white">
                  {t('MainEventPage.locationDescription')}
                </span>
              </div>
              <div className="flex flex-row flex-wrap gap-3 justify-around lg:justify-start items-center">
                <a
                  href={authUser?.mapUrl || '#'}
                  target="_blank"
                  className="flex flex-row text-nowrap gap-1 justify-center items-center rounded-full py-3 px-4 bg-purple-600 text-white text-sm"
                >
                  <MapPinIcon className="size-5" />
                  {t('MainEventPage.mapButtonText')}
                </a>
                <button className="flex flex-row text-nowrap gap-1 justify-center items-center rounded-full py-3 px-4 bg-orange-600 text-white text-sm">
                  <PlayCircleIcon className="size-5" />
                  {t('MainEventPage.watchButtonText')}
                </button>
                {authUser && (authUser.placement === 'head office' || authUser.placement === 'jakarta') && (
                  <a
                    href="https://storage.googleapis.com/paragon-p40-cdn/booklet/booklet_venue_jakarta.pdf"
                    target="_blank"
                    className="flex flex-row text-nowrap gap-1 justify-center items-center rounded-full py-3 px-4 bg-green-600 text-white text-sm"
                  >
                    <BookOpenIcon className="size-5" />
                    {t('MainEventPage.GIEnter')}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Do n Dont's */}
        {true && 
          <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-full lg:col-span-1">
                <h3 className="text-4xl lg:text-6xl text-white mb-8">Do</h3>
                <div className="grid grid-cols-1 gap-6 lg:px-6">
                  {Array.from({ length: 14 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <CheckCircleIcon className="size-6 lg:size-8 text-green-500 flex-shrink-0" />
                        <span className="text-white text-pretty text-base lg:text-xl">{t(`MainEventPage.do${index+1}`)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-full lg:col-span-1">
                <h3 className="text-4xl lg:text-6xl text-white mb-8">Dont's</h3>
                <div className="grid grid-cols-1 gap-6 lg:px-6">
                  {Array.from({ length: 10 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center"
                      >
                        <XMarkIcon className="size-6 lg:size-8 text-red-500 flex-shrink-0" />
                        <span className="text-white text-pretty text-base lg:text-xl">{t(`MainEventPage.dont${index+1}`)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div className="mt-14">
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
            </div> */}
          </div>
        }
      </div>
    </div>
  );
}
