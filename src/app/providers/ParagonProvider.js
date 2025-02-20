'use client';

import { getOpeningSpeechPoll, getUserVotes, getWeeklyPoll } from "@/utils/firebase/firestoreHelper";
import { UserContext } from "./AuthProvider";

const { createContext, useState, useContext, useEffect, useCallback, useMemo } = require("react");


export const ParagonContext = createContext(null);
export default function ParagonProvider ({children}) {
  const authUser = useContext(UserContext)

  const [weeklyPolls, setWeeklyPolls] = useState([])
  const [currWeeklyPoll, setCurrWeeklyPoll] = useState(null)
  const [userVotes, setUserVotes] = useState([])
  const [isUserVotesFetched, setIsUserVotesFetched] = useState(false)

  const [openingSpeechPoll, setOpeningSpeechPoll] = useState(null)

  const fetchUserVotes = useCallback((_authuser) => {
    getUserVotes(_authuser)
    .then(v => {
      setUserVotes(v)
      setIsUserVotesFetched(true)
    })
  }, [])

  useEffect(() => {
    if (!authUser?.id) {
      setUserVotes([])
      setIsUserVotesFetched(false)
      setOpeningSpeechPoll(null)
      return
    }

    getWeeklyPoll()
    .then(v => {
      setWeeklyPolls(v.sort((a,b) => a.week - b.week))
      const t = Math.floor(Date.now() / 1000)
      const c = v.find(o => o.startTime.seconds <= t && o.endTime.seconds >= t)
      setCurrWeeklyPoll(c)
      // console.log(v,t,c)
      //TODO: setPollResultViewingKey to current 
    })

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
    })

    fetchUserVotes(authUser)
  }, [authUser])

  const openingSpeechVote = useMemo(() => {
    return userVotes?.find(v => v.id == `${openingSpeechPoll?.id}-${authUser?.id}`)
  }, [userVotes, openingSpeechPoll, authUser])

  return (
    <ParagonContext.Provider value={{
      weeklyPolls,
      currWeeklyPoll,
      userVotes,
      isUserVotesFetched,
      openingSpeechPoll,
      openingSpeechVote,
      fetchUserVotes
    }} >
      {children}
    </ParagonContext.Provider>
  )
}