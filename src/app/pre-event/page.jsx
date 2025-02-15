"use client"

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { UserContext } from '../providers/AuthProvider'
import { getOpeningSpeechPoll } from '@/utils/firebase/firestoreHelper'

export default function PreEventPage() {
  const t = useTranslations();
  const locale = useLocale();
  const authUser = useContext(UserContext)
  const [openingSpeechPoll, setOpeningSpeechPoll] = useState(null)

  // fetch data
  useEffect(() => {
    if (!authUser?.id) {
      setOpeningSpeechPoll(null)
      return
    }

    getOpeningSpeechPoll(authUser)
      .then(v => {
        console.log('open speech poll', v)
        const t = Math.floor(Date.now() / 1000)
        if (v.startTime.seconds <= t && v.endTime.seconds >= t) {
          setOpeningSpeechPoll(v)
        } else {
          console.log('poll expired', v)
        }
      })
  }, [authUser, setOpeningSpeechPoll])

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">PRE-EVENT</h1>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]' />
        </div>
      </div>

      {/* VOTING OPENING SPEECH */}
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4 z-10">
        {openingSpeechPoll ? (
          <>
            <p className="text-xl lg:text-4xl font-bold mb-2">{openingSpeechPoll?.title[locale]}</p>
            <p className="text-base mb-2">{openingSpeechPoll?.description[locale]}</p>
            <Menu as="div" className="relative text-left">
              <div>
                <MenuButton className="flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                  <div className="flex">
                    <UserIcon aria-hidden="true" className="-mr-1 size-4 text-gray-400" />
                    <div className='ml-2 text-gray-400'>Select team member</div>
                  </div>
                  <div className="flex">
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-4 text-gray-400" />
                  </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute mt-2 w-full divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
              {openingSpeechPoll.choices.map((choice => (
                <div className="py-1" key={choice.key}>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      {choice.text[locale]}
                    </a>
                  </MenuItem>
                </div>
              )))}
              </MenuItems>
            </Menu>
          </>
        ) : (
          <div className="mt-4 flex justify-center">
            <p>...</p>
          </div>
        )
        }
      </div>

      {/* Timeline */}
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.timeline')}</a>
        <div className="">
          <div className="relative pl-8 lg:pl-24 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
              <div className="px-7 bg-blue-700 rounded-full w-65 ">
                <p className="text-base">Pre-event:</p>
                <p className="text-base">Festival Paragonian Talks</p>
              </div>
            </div>
            <div className="pl-3">
              <p>February 14th, 2025</p>
              <p>(07.30-10.00 WIB)</p>
              <p className='font-bold'>HO (P9), Plant (J6), All DC</p>
            </div>
          </div>
          <div className="relative pl-8 lg:pl-24 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
              <div className="px-7 bg-blue-700 rounded-full w-65 ">
                <p className="text-base">Pre-event: Festival</p>
                <p className="text-base">Paragonian Talks (Malaysia)</p>
              </div>
            </div>
            <div className="pl-3">
              <p>February 26th, 2025</p>
              <p>(08.30-09.30 WIB)</p>
              <p className='font-bold'>Malaysia</p>
            </div>
          </div>
          <div className="relative pl-8 lg:pl-24 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
              <div className="px-7 bg-blue-700 rounded-full w-65 ">
                <p className="text-base">Pre-event:</p>
                <p className="text-base">Inauguration of Paragon HQ</p>
              </div>
            </div>
            <div className="pl-3">
              <p>February 26th, 2025</p>
              <p>(08.30-09.30 WIB)</p>
              <p className='font-bold'>Ciledug Office</p>
            </div>
          </div>
          <div className="relative pl-8 lg:pl-24 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
              <div className="px-7 bg-blue-700 rounded-full w-65 ">
                <p className="text-base">Main Event</p>
              </div>
            </div>
            <div className="pl-3">
              <p>February 28th, 2025</p>
              <p>(07.30-10.00 WIB)</p>
              <p className='font-bold'>Movie theaters in every branch area</p>
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
              <div className="pl-3">
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
              <div className="pl-3">
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
              <div className="pl-3">
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
              <div className="pl-3">
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