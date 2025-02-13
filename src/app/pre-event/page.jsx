"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function PreEventPage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">PRE-EVENT</h1>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>

      {/* VOTING OPENING SPEECH */}
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <p className="text-xl lg:text-4xl font-bold mb-2">{t('PreEventPage.openingSpeech')}</p>
        <p className="text-base">{t('PreEventPage.openingSpeechDescription')}?</p>
      </div>

      {/* TIMELINE */}
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.timeline')}</a>
        <div className="-my-6 mt-5">
          <div className="relative pl-8 lg:pl-24 py-6 group">
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
          <div className="relative pl-8 lg:pl-24 py-6 group">
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
          <div className="relative pl-8 lg:pl-24 py-6 group">
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
          <div className="relative pl-8 lg:pl-24 py-6 group">
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

      <div className="grid grid-cols-3 lg:reverse my-2 lg:my-4 gap-4 lg:gap-8">
        {/* COMING SOON */}
        <Image className="rounded-3xl w-full col-span-full lg:col-span-1" src="/paragonian_talks.png" alt="coming soon paragonian talk" width="300" height="500" />
        {/* FESTIVAL PARAGON TALKS */}
        <div className="bg-kv-gradient rounded-3xl col-span-full lg:col-span-2 text-white p-6 lg:-order-1">
          <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.festivalParagonTalks')}</a>
          <div className="-my-6 mt-5">
            <div className="relative pl-8 lg:pl-24 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
                  <p className="text-base">Head Office Indonesia</p>
                </div>
              </div>
              <div className="font-bold pl-3">
                <p>February 14th, 2025</p>
                <p>(07.30-10.00 WIB)</p>
              </div>
            </div>
            <div className="relative pl-8 lg:pl-24 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
                  <p className="text-base">Plant Indonesia</p>
                </div>
              </div>
              <div className="font-bold pl-3">
                <p>February 26th, 2025</p>
                <p>(14.00-17.00 WIB)</p>
              </div>
            </div>
            <div className="relative pl-8 lg:pl-24 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
                  <p className="text-base">DC Indonesia</p>
                </div>
              </div>
              <div className="font-bold pl-3">
                <p>February 26th, 2025</p>
                <p>(07.30-10.00 WIB)</p>
              </div>
            </div>
            <div className="relative pl-8 lg:pl-24 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
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
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.aboutFestival')} Paragonian Talks</a>
        <div className="mt-5">
          <p className="text-base mb-3">{t('PreEventPage.festivalDescription1')}</p>
          <p className="text-base mb-3">{t('PreEventPage.festivalDescription2')}</p>
          <p className="text-base mb-3">{t('PreEventPage.festivalDescription3')}</p>
          <p className="text-base">{t('PreEventPage.festivalDescription4')}</p>
        </div>
      </div>
    </div>
  );
}