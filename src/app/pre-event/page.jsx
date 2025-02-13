"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function PreEventPage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="flex max-w-screen-2xl justify-between px-16">
          <div>
            <h1 className="text-7xl font-bold">PRE-EVENT</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128"/>
          </div>
        </div>
        {/* VOTING OPENING SPEECH */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-8 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full">
            <a href="" className="text-3xl">{t('PreEventPage.openingSpeech')}</a>
            <p className="text-base">{t('PreEventPage.openingSpeechDescription')}?</p>
          </div>
        </div>
        {/* VOTING RESULT */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-2 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full">
            <a href="" className="text-3xl">{t('PreEventPage.votingResult')}</a>
          </div>
        </div>
        {/* TIMELINE */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-2 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full">
            <a href="" className="text-3xl">{t('PreEventPage.timeline')}</a>
            <div className="-my-6 mt-5">
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event:</p>
                    <p className="text-base">Festival Paragonian Talks</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 14th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                  <p>HO (P9), Plant (J6), All DC</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event: Festival</p>
                    <p className="text-base">Paragonian Talks (Malaysia)</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(08.30-09.30 WIB)</p>
                  <p>Malaysia</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Pre-event:</p>
                    <p className="text-base">Inauguration of Paragon HQ</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(08.30-09.30 WIB)</p>
                  <p>Ciledug Office</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-blue-700 rounded-full w-65 ">
                    <p className="text-base">Main Event</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 28th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                  <p>Movie theaters in every branch area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* COMING SOON */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-2 text-white">
          <Image className="rounded-3xl w-full h-full" src="/paragonian_talks.png" alt="coming soon paragonian talk" width="300" height="500" />
        </div>
        {/* FESTIVAL PARAGON TALKS */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-2 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full">
            <a href="" className="text-3xl">{t('PreEventPage.festivalParagonTalks')}</a>
            <div className="-my-6 mt-5">
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-violet-300 rounded-full w-65 ">
                    <p className="text-base">Head Office Indonesia</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 14th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-violet-300 rounded-full w-65 ">
                    <p className="text-base">Plant Indonesia</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(14.00-17.00 WIB)</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-violet-300 rounded-full w-65 ">
                    <p className="text-base">DC Indonesia</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 26th, 2025</p>
                  <p>(07.30-10.00 WIB)</p>
                </div>
              </div>
              <div className="relative pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-violet-300 rounded-full w-65 ">
                    <p className="text-base">DC Malaysia</p>
                  </div>
                </div>
                <div className="font-bold pl-3">
                  <p>February 28th, 2025</p>
                  <p>(09.00-11.00 WIB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ABOUT PARAGONIAN TALKS */}
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-2 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full">
            <a href="" className="text-3xl">{t('PreEventPage.aboutFestival')} Paragonian Talks</a>
            <div className="mt-5">
              <p className="text-base mb-3">{t('PreEventPage.festivalDescription1')}</p>
              <p className="text-base mb-3">{t('PreEventPage.festivalDescription2')}</p>
              <p className="text-base mb-3">{t('PreEventPage.festivalDescription3')}</p>
              <p className="text-base">{t('PreEventPage.festivalDescription4')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}