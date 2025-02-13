"use client"

import { useTranslations } from 'next-intl';
import LocaleSwitch from '@/components/LocaleSwitch';
import NavLink from '@/components/NavLink';
import ListItems from '@/components/ListItems';
import AddItem from '@/components/AddItems';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function AboutPage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="flex max-w-screen-2xl justify-between px-16">
          <div>
            <h1 className="text-7xl font-bold">ABOUT PARAGON P40</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128"/>
          </div>
        </div>
        
        <div className="mx-auto max-w-screen py-4 px-16 mt-8">
          <div className="mr-5">
            <Image className="rounded-3xl w-full h-full" src="/dream_sm.png" alt="dream" width="300" height="500" />
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-8">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-200 to-fuchsia-200 h-full text-white">
            <h1 className="text-6xl font-bold mb-5">UNLOCK</h1>
            <h1 className="text-6xl font-bold mb-10">NEW THINKING</h1>
            <p className="text-base mb-5">Paragon is about to turn 40. It's not about the usual celebrations. It's a moment with 14,000 Paragonians, where we will open a new and better way of thinking for the betterment of the future from today. You are the ones who decide, because “Paragon's Choice is Paragonian's Choice”.</p>
            <p className="text-base mb-5">It's not just about celebrating Paragon's journey, but affirming that a new game has begun with greater challenges, bolder innovations, and broader impact.</p>
            <p className="text-base">Paragon has not only survived in the industry, but also changed the game. Now, at 40 years old, after unlocking new thinking, we enter a new arena with a new mindset, ready to accelerate innovation, create global impact, and build a more advanced civilization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}