"use client"

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useContext, useEffect, useState, useCallback } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { UserContext } from '../providers/AuthProvider'
import { getOpeningSpeechPoll, getOpeningSpeechVote, submitVote } from '@/utils/firebase/firestoreHelper'
import clsx from 'clsx'
import {Swiper,SwiperSlide}  from 'swiper/react'
import {Navigation, Pagination} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export default function PreEventPage() {
  const t = useTranslations();
  const locale = useLocale();
  const authUser = useContext(UserContext)
  const [openingSpeechPoll, setOpeningSpeechPoll] = useState(null)
  const [openingSpeechVote, setOpeningSpeechVote] = useState(null)

  // fetch data
  useEffect(() => {
    if (!authUser?.id) {
      setOpeningSpeechPoll(null)
      setOpeningSpeechVote(null)
      return
    }

    getOpeningSpeechPoll(authUser)
    .then(poll => {
      const t = Math.floor(Date.now() / 1000)
      if (poll.startTime.seconds <= t && poll.endTime.seconds >= t) {
        setOpeningSpeechPoll(poll)
        return poll
      } else {
        console.log('poll expired', poll)
        return null
      }
    }).then(poll => {
      if(poll) {
        getOpeningSpeechVote(authUser, poll.id).then(vote => {
          setOpeningSpeechVote(vote)
        })
      }
    })
  }, [authUser, setOpeningSpeechPoll, setOpeningSpeechVote])
  
  const selectChoice = useCallback((pollId, choiceId) => {
      submitVote(authUser, pollId, choiceId)
      .then(() => {
        getOpeningSpeechVote(authUser, pollId).then((vote) => {
          setOpeningSpeechVote(vote)
        })
      })

    }, [authUser])

  return (
    <div className="flex-grow pb-8 bg-kv-2">
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
          <p className="text-xl lg:text-4xl font-bold mb-2">{t('PreEventPage.openingSpeech')}</p>
          {openingSpeechPoll ? (
            <>
              <p className="text-base lg:text-2xl mb-2">Q: {openingSpeechPoll?.description[locale]}</p>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              {openingSpeechPoll.choices.map((choice => (
                  <button 
                      type='button' key={choice.key}
                      className={clsx(openingSpeechVote?.choiceId == choice.key ? "bg-white text-[#4A4A4A] select-none pointer-events-none" :
                        "hover:ring-2 hover:ring-inset hover:ring-brandorange hover:border-brandorange"
                      , "p-4 rounded-full border border-white flex items-center gap-2")}
                      onClick={() => {selectChoice(openingSpeechPoll.id, choice.key)}}
                    >
                      <div className="flex-grow text-left text-sm lg:text-base">{choice.text[locale]}</div>
                      {openingSpeechVote?.choiceId == choice.key &&
                        <div className="text-purple-700 bg-purple-100 rounded-full h-6 w-6 flex justify-center items-center flex-shrink-0"><CheckIcon className='size-4'/></div>
                      }
                  </button>
                )))}
              </div>
            </>
          ) : (
            <div className="mt-4 flex justify-center">
              <p>...</p>
            </div>
          )}
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
                  <p className="text-base">Pre-event:</p>
                  <p className="text-base">Peresmian of Paragon HQ</p>
                </div>
              </div>
              <div className="pl-3">
                <p>February 17th, 2025</p>
                <p>(07.30-09.30 WIB)</p>
                <p className='font-bold'>Ciledug Office</p>
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
                <p>February 21st, 2025</p>
                <p>(08.30-10.30 MST)</p>
                <p className='font-bold'>Malaysia</p>
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
                <p className='font-bold'>Offline, in each work area</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 lg:reverse my-2 lg:my-4 gap-4 lg:gap-8">
          {/* COMING SOON */}
          <Image className="rounded-3xl w-full col-span-full lg:col-span-1" src="/paragonian_talks.png" alt="coming soon paragonian talk" width="300" height="500" />
          {/* FESTIVAL PARAGONIAN TALKS */}
          <div className="bg-kv-gradient rounded-3xl col-span-full lg:col-span-2 text-white p-6 lg:-order-1">
            <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.festivalParagonTalks')}</a>
            <div className="-my-6 mt-5">
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
                    <p className="text-base">Head Office</p>
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
                    <p className="text-base">DC</p>
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
                    <p className="text-base">Plant</p>
                  </div>
                </div>
                <div className="pl-3">
                  <p>February 14th, 2025</p>
                  <p>(14.30-17.30 WIB)</p>
                </div>
              </div>
              <div className="relative pl-8 lg:pl-24 py-6 group">
                <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-white sm:before:ml-16 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-gray-500 after:border-4 after:box-content after:border-gray-500 after:rounded-full sm:after:ml-16 after:-translate-x-1/2 after:translate-y-1.5">
                  <div className="px-7 bg-[#8855FF] rounded-full w-65 ">
                    <p className="text-base">Malaysia</p>
                  </div>
                </div>
                <div className="pl-3">
                  <p>February 21st, 2025</p>
                  <p>(08.30-10.30 WIB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full my-2 lg:my-4">
          <Swiper
            className='rounded-3xl'
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Image src="/fpt1.webp" width={1920} height={921} alt='Festival Paragonian Talk Slide 1' />
            </SwiperSlide>
            <SwiperSlide>
              <Image src="/fpt2.webp" width={1920} height={921} alt='Festival Paragonian Talk Slide 2' />
            </SwiperSlide>
          </Swiper>
        
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
    </div>
  );
}