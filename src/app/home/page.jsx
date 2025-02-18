"use client"

import { useFormatter, useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../providers/AuthProvider';
import { getUserVotes, getWeeklyPoll, submitVote } from '@/utils/firebase/firestoreHelper';
import clsx from 'clsx';
import _ from 'lodash';
import { CheckIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const t = useTranslations();
  const format = useFormatter();
  const locale = useLocale();
  const authUser = useContext(UserContext)
  const [weeklyPolls, setWeeklyPolls] = useState([])
  const [currWeeklyPoll, setCurrWeeklyPoll] = useState(null)
  const [pollResultViewingKey, setPollResultViewingKey] = useState(1)
  const [userVotes, setUserVotes] = useState([])

  // fetch data
  useEffect(() => {
    getWeeklyPoll()
    .then(v => {
      setWeeklyPolls(v.sort((a,b) => a.week - b.week))
      const t = Math.floor(Date.now() / 1000)
      const c = v.find(o => o.startTime.seconds <= t && o.endTime.seconds >= t)
      setCurrWeeklyPoll(c)
      // console.log(v,t,c)
      //TODO: setPollResultViewingKey to current 
    })
  }, [setWeeklyPolls,setCurrWeeklyPoll])

  useEffect(() => {
    if (!authUser?.id) {
      setUserVotes([])
      return
    }
    getUserVotes(authUser)
    .then(v => {
      setUserVotes(v)
      // console.log('votes', v)
    })
  }, [authUser, setUserVotes])

  const pollResult = useMemo(() => {
    const poll = weeklyPolls.find(o => o.week == pollResultViewingKey);
    if (!poll) return null
    let highestVote = 0
    let highestVoteKey = null
    Object.entries(poll.result?.votes).forEach(([k,v]) => {
      v = parseInt(v)
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
    <div className="flex-grow pb-8 bg-kv-3">
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
            <span className='font-bold'>Pre-Event</span> | 14, 17, 21 Feb 2025
          </div>
          <div className='bg-[#0321FF] py-4 px-4 lg:px-8 rounded-full text-white'>
            <span className='font-bold'>Main-Event</span> | 28 Feb 2025
          </div>
        </div>
        <div className="w-full p-6 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <div className="flex justify-between">
            <a href="" className="text-xl lg:text-4xl font-bold">{t('HomePage.weeklyQuestion')}</a>
            {currWeeklyPoll && (
              <div className="flex rounded-2xl bg-white text-violet-500 p-2">
                {t('HomePage.week')} {currWeeklyPoll.week}
              </div>
            )}
          </div>
          {currWeeklyPoll ? (
            <div className="mt-4">

              <p className='text-base lg:text-2xl mb-4'>Q: {currWeeklyPoll.description[locale]}</p>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                {currWeeklyPoll.choices.map((choice => (
                  <button 
                    type='button' key={choice.key}
                    className={clsx(getSelectedChoice(currWeeklyPoll.id) == choice.key ? "bg-white text-[#4A4A4A] select-none pointer-events-none" :
                      "hover:ring-2 hover:ring-inset hover:ring-brandorange hover:border-brandorange"
                    , "p-4 rounded-full border border-white flex items-center gap-2")}
                    onClick={() => doSubmitVote(currWeeklyPoll.id, choice.key)}
                  >
                    <div className="flex-grow text-left text-sm lg:text-base">{choice.text[locale]}</div>
                    {getSelectedChoice(currWeeklyPoll.id) == choice.key &&
                      <div className="text-purple-700 bg-purple-100 rounded-full h-6 w-6 flex justify-center items-center flex-shrink-0"><CheckIcon className='size-4'/></div>
                    }
                  </button>
                )))}
              </div>
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <p>...</p>
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
                  className={
                    clsx(
                      'rounded-full border px-2 border-purple-700 text-xs lg:px-4 lg:py-2 lg:text-sm disabled:text-gray-600 disabled:border-gray-600',
                      pollResultViewingKey == poll.week ? 'bg-purple-700 ' : 'text-purple-700'
                    )
                  }
                  onClick={() => setPollResultViewingKey(poll.week)}
                  disabled={poll.startTime.seconds > Math.floor(Date.now() / 1000)}
                >{t('HomePage.weekShort')}{poll.week}</button>
              ))}
            </div>
            <div className="flex lg:justify-end col-span-3 lg:col-span-2">
              <div className="flex rounded-2xl bg-white text-violet-500 p-2">
                Total Vote: <div className='min-w-10 text-center ml-2'>{pollResult?.result?.totalVote ? format.number(pollResult?.result?.totalVote) : '-'}</div>
              </div>
            </div>
          </div>
          {pollResult?.endTime?.seconds < Math.floor(Date.now() / 1000) ? (
            <div className="mt-4">

              <p className='mb-4 text-base lg:text-2xl'>Q: {pollResult.description[locale]}</p>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 items-center select-none">
                {pollResult.choices.map((choice => (
                  <div 
                    key={choice.key}
                    className={pollResult.result.highestVoteKey == choice.key ? "p-3 bg-yellow-300 rounded-3xl" : ""}
                  >
                    <div className={clsx("p-4 rounded-full border border-white flex justify-between items-center", pollResult.result.highestVoteKey == choice.key ? "bg-white text-[#4A4A4A]" : "")}>
                      <div className="flex-grow text-left text-sm lg:text-base">{choice.text[locale]}</div>
                      {getSelectedChoice(pollResult.id) == choice.key &&
                        <div className="text-purple-700 bg-purple-100 rounded-full h-6 w-6 flex justify-center items-center flex-shrink-0"><CheckIcon className='size-4'/></div>
                      }
                    </div>
                    <div className="flex justify-center">
                      <div className={clsx("mt-2 px-4 py-2 rounded-full flex gap-2",pollResult.result.highestVoteKey == choice.key ? "" : "bg-[#ABAEFF]" )}>
                        { pollResult.result.highestVoteKey == choice.key && (
                          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.21 13.89L3 23L8 20L13 23L11.79 13.88M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {`${pollResult.result.votes[choice.key] / pollResult.result.totalVote * 100}% (${format.number(pollResult.result.votes[choice.key])} ${t('HomePage.vote')})`}
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          ) : (
            <div className="m-4 lg:m-8 flex flex-col justify-center items-center gap-2">
              <Square3Stack3DIcon className='size-16 text-slate-200' />
              <p className='text-xl text-center'>{t('HomePage.votingInProgress')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}