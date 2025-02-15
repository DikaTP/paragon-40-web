"use client"

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../providers/AuthProvider';
import { getUserVotes, getWeeklyPoll, submitVote } from '@/utils/firebase/firestoreHelper';
import clsx from 'clsx';
import _ from 'lodash';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const authUser = useContext(UserContext)
  const [weeklyPolls, setWeeklyPolls] = useState([])
  const [currWeeklyPoll, setCurrWeeklyPoll] = useState(null)
  const [pollResultViewingKey, setPollResultViewingKey] = useState(1)
  const [userVotes, setUserVotes] = useState([])
  const [isUserVotesFetched, setIsUserVotesFetched] = useState(false)

  // fetch data
  useEffect(() => {
    getWeeklyPoll()
    .then(v => {
      setWeeklyPolls(v.sort((a,b) => a.week - b.week))
      const t = Math.floor(Date.now() / 1000)
      const c = v.find(o => o.startTime.seconds <= t && o.endTime.seconds >= t)
      setCurrWeeklyPoll(c)
      console.log(v,t,c)
    })
  }, [setWeeklyPolls,setCurrWeeklyPoll])

  useEffect(() => {
    if (!authUser?.id) {
      setUserVotes([])
      setIsUserVotesFetched(false)
      return
    }
    getUserVotes(authUser)
    .then(v => {
      setUserVotes(v)
      setIsUserVotesFetched(true)
      console.log('votes', v)
    })
  }, [authUser, setUserVotes, setIsUserVotesFetched])

  const pollResult = useMemo(() => {
    const poll = weeklyPolls.find(o => o.week == pollResultViewingKey);
    if (!poll) return null
    let highestVote, highestVoteKey = 0
    Object.entries(poll.result?.votes).forEach((k,v) => {
      if (v > highestVote) {
        highestVote = v
        highestVoteKey = k
      }
    })
    return {
      ...poll,
      result: {
        ...poll.result,
        highestVoteKey: highestVoteKey
      }
    }
  }, [weeklyPolls, pollResultViewingKey])

  const doSubmitVote = useCallback((pollId, choiceId) => {
    submitVote(authUser, pollId, choiceId)
    .then(() => {
      getUserVotes(authUser).then((list) => {
        setUserVotes(list)
      })
    })
  }, [authUser])

  const getSelectedChoice = (pollId) => {
    let selectedChoice = _.find (userVotes, (userVote) => {
      return userVote.id == `${pollId}-${authUser.id}`
    });

    return selectedChoice?.choiceId
  }

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
      <div className="flex w-full justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-lg lg:text-7xl font-bold">{t('HomePage.welcomeMessage')}</h1>
          <h2 className="lg:text-5xl">{t('HomePage.welcome')}, {authUser?.name || ''}</h2>
        </div>
        <div>
          <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50] lg:w-[200]'/>
        </div>
      </div>
      <div className="flex gap-2 lg:gap-4 text-xs lg:text-base my-2 lg:my-4">
        <div className='bg-[#0321FF] py-4 px-4 lg:px-8 rounded-full text-white'>
          <span className='font-bold'>Pre-Event</span> | 1-27 Feb 2025
        </div>
        <div className='bg-[#0321FF] py-4 px-4 lg:px-8 rounded-full text-white'>
          <span className='font-bold'>Main-Event</span> | 28 Feb 2025
        </div>
      </div>
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <a href="" className="text-xl lg:text-4xl font-bold">{t('HomePage.weeklyQuestion')}</a>
        {currWeeklyPoll ? (
          <div className="mt-4">

            <p className='mb-4'>Q: {currWeeklyPoll.description[locale]}</p>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
              {currWeeklyPoll.choices.map((choice => (
                <button 
                  type='button' key={choice.key}
                  className={clsx(
                    "p-4 rounded-full border border-white hover:bg-white hover:text-[#4A4A4A]",
                    getSelectedChoice(currWeeklyPoll.id) == choice.key ? 'bg-white text-[#4A4A4A]' : ''
                  )}
                  onClick={() => doSubmitVote(currWeeklyPoll.id, choice.key)}
                >
                  {choice.text[locale]}
                </button>
              )))}
            </div>
          </div>
          
        ) : (
          <div className="mt-4 flex justify-center">
            <p>kosong</p>
          </div>
        )}
      </div>
      <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
        <div className="grid grid-cols-6 gap-y-4">
          <a href="" className="text-xl lg:text-4xl font-bold col-span-3 lg:col-span-2">{t('HomePage.votingResult')}</a>
          <div className="flex gap-1 lg:gap-2 items-center justify-center col-span-3 lg:col-span-2">
            {weeklyPolls?.map(poll => (
              <button
                type="button" key={poll.week}
                className='rounded-full border px-2 text-xs lg:px-4 lg:py-2 lg:text-sm'
                onClick={() => setPollResultViewingKey(poll.week)}
              >{t('HomePage.weekShort')}{poll.week}</button>
            ))}
          </div>
          <div className="flex lg:justify-end col-span-3 lg:col-span-2">
            <div className="flex rounded-2xl bg-white text-violet-500 p-2">
              Total Vote: <div className='min-w-10 text-center'>{pollResult?.result?.totalVote || '-'}</div>
            </div>
          </div>
        </div>
        {pollResult ? (
          <div className="mt-4">

            <p className='mb-4'>Q: {pollResult.description[locale]}</p>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 select-none">
              {pollResult.choices.map((choice => (
                <div 
                  key={choice.key}
                  className="p-4 rounded-full border border-white"
                >
                  {choice.text[locale]}
                </div>
              )))}
            </div>
          </div>
          
        ) : (
          <div className="mt-4 flex justify-center">
            <p>kosong</p>
          </div>
        )}
      </div>
    </div>
  );
}