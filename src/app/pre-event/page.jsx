"use client"

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline'
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
  const [isUserVotesFetched, setIsUserVotesFetched] = useState(false)
  const [isUserVoted, setIsUserVoted] = useState(false)

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
      if (poll?.startTime.seconds <= t && poll?.endTime.seconds >= t) {
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
          setIsUserVotesFetched(true)
        })
      }
    })
  }, [authUser, setOpeningSpeechPoll, setOpeningSpeechVote, setIsUserVotesFetched])
  
  const selectChoice = useCallback((pollId, choiceId) => {
      submitVote(authUser, pollId, choiceId)
      .then(() => {
        setIsUserVoted(true)
        // getOpeningSpeechVote(authUser, pollId).then((vote) => {
        //   setOpeningSpeechVote(vote)
        // })
      })

    }, [authUser, setIsUserVoted])

  const timelineData = useMemo(() => [
    {
      title1: 'Pre-event:',
      title2: 'Festival Paragonian Talks',
      date: locale == 'en' ? 'February 14th, 2025' : '14 Februari 2025',
      time: '(07.30 - 10.00 WIB)',
      location: 'HO (P9), Plant (J6), All DC',
    },
    {
      title1: 'Pre-event:',
      title2: 'Peresmian Paragon HQ',
      date: locale == 'en' ? 'February 17th, 2025' : '17 Februari 2025',
      time: '(07.30 - 09.30 WIB)',
      location: 'Ciledug Office',
    },
    {
      title1: 'Pre-event:',
      title2: 'Paragonian Talks (Malaysia)',
      date: locale == 'en' ? 'February 21th, 2025' : '21 Februari 2025',
      time: '(08.30 - 10.30 MYT)',
      location: 'Malaysia',
    },
    {
      title1: 'Main Event',
      title2: null,
      date: locale == 'en' ? 'February 28th, 2025' : '28 Februari 2025',
      time: '(07.30-10.00 WIB)',
      location: t('MainEventPage.offlineArea'),
    },
  ], [locale])

  const fptData = useMemo(() => [
    {
      title: 'Head Office',
      date: locale == 'en' ? 'February 14th, 2025' : '14 Februari 2025',
      time: '(07.30 - 10.00 WIB)',
      icon: true,
    },
    {
      title: 'DC',
      date: locale == 'en' ? 'February 14th, 2025' : '14 Februari 2025',
      time: '(07.30 - 10.00 WIB)',
      icon: true,
    },
    {
      title: 'Plant',
      date: locale == 'en' ? 'February 14th, 2025' : '14 Februari 2025',
      time: '(14.30 - 17.30 WIB)',
      icon: true,
    },
    {
      title: 'Malaysia',
      date: locale == 'en' ? 'February 21th, 2025' : '21 Februari 2025',
      time: '(08.30 - 10.30 MYT)',
      icon: true,
    },
  ], [locale])

  return (
    <div className="flex-grow pb-8 bg-kv-2">
      <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
        <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
            <h1 className="text-lg lg:text-7xl font-bold">PRE-EVENT</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50px] lg:w-[200px]' />
          </div>
        </div>

        {/* VOTING OPENING SPEECH */}
        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4 z-10">
          <p className="text-xl lg:text-4xl font-bold mb-2">{t('PreEventPage.openingSpeech')}</p>
          {openingSpeechPoll ? (
            isUserVotesFetched && (
              (isUserVoted || openingSpeechVote?.choiceId) ? (
                <div className="mt-4">
                  <div className="m-4 lg:m-8 flex flex-col justify-center items-center gap-2">
                    <CheckCircleIcon className='size-16 text-slate-200' />
                    <p className='text-xl text-center'>{t('HomePage.voteSubmited')}</p>
                  </div>
                </div>
              ) : (
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
              )
            )
          ) : (
            <div className="mt-4">
              <div className="m-4 lg:m-8 flex flex-col justify-center items-center gap-2">
                <CheckCircleIcon className='size-16 text-slate-200' />
                <p className='text-xl text-center'>{t('HomePage.voteSubmited')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.timeline')}</a>
          <div className="mt-6 pt-4 space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-2 before:bg-white">

            {timelineData.map((data,idx) => (
              <div key={idx} className="relative flex justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* <!-- Icon --> */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                </div>
                {/* <!-- Card --> */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] flex flex-col items-start md:group-even:items-end">
                  <div className="">
                    <div className="px-7 py-2 bg-blue-700 rounded-full">
                      <p className="text-base">{data.title1}</p>
                      {data.title2 && (
                        <p className="text-base">{data.title2}</p>
                      )}
                    </div>
                    <div className="pl-7 mt-2">
                      <p>{data.date}</p>
                      <p>{data.time}</p>
                      <p className='font-bold'>{data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 lg:reverse my-2 lg:my-4 gap-4 lg:gap-8">
          {/* COMING SOON */}
          <Image className="rounded-3xl w-full col-span-full lg:col-span-1" src="/paragonian_talks.png" alt="coming soon paragonian talk" width="300" height="500" />
          {/* FESTIVAL PARAGONIAN TALKS */}
          <div className="bg-kv-gradient rounded-3xl col-span-full lg:col-span-2 text-white p-6 lg:-order-1">
            <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.festivalParagonTalks')}</a>
            <div className="mt-6 pt-4 space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-2 before:bg-white">

              {fptData.map((data,idx) => (
                <div key={idx} className="relative flex justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* <!-- Icon --> */}
                  
                  <div className={clsx("flex items-center justify-center w-10 h-10 rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2", data.icon && "border border-white bg-slate-300 text-slate-500 shadow")}>
                  </div>
                  {/* <!-- Card --> */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] flex flex-col items-start md:group-even:items-end">
                    <div className="">
                      <div className="px-7 py-2 bg-[#8855FF] rounded-full">
                        <p className="text-base">{data.title}</p>
                      </div>
                      <div className="pl-7 mt-2">
                        <p>{data.date}</p>
                        <p>{data.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.about')} Festival Paragonian Talks</a>
          <div className="mt-5">
            <p className="text-base mb-3">{t('PreEventPage.festivalDescription1')}</p>
            <p className="text-base mb-3">{t('PreEventPage.festivalDescription2')}</p>
            <p className="text-base mb-3">{t('PreEventPage.festivalDescription3')}</p>
            <p className="text-base">{t('PreEventPage.festivalDescription4')}</p>
          </div>
        </div>

        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <a href="" className="text-xl lg:text-4xl font-bold">{t('PreEventPage.about')} Peresmian HQ</a>
          <div className="mt-5">
            <p className="text-base mb-3 whitespace-pre-line">{t('PreEventPage.HQInauguration')}</p>
          </div>
        </div>

      </div>
    </div>
  );
}