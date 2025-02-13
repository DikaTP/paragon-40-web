"use client"

import { useTranslations } from 'next-intl';
import LocaleSwitch from '@/components/LocaleSwitch';
import NavLink from '@/components/NavLink';
import ListItems from '@/components/ListItems';
import AddItem from '@/components/AddItems';
import Image from 'next/image';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const t = useTranslations();
  const s = useSession()
  
  return (
    <div className="flex grow flex-col">
      <div className="">
        <div className="flex max-w-screen-2xl justify-between px-16">
          <div>
            <h1 className="text-7xl font-bold">PROFILE PAGE</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128"/>
          </div>
        </div>
        <div className="mx-auto flex max-w-screen-2xl py-4 px-16 mt-8 text-white">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-r from-sky-300 to-fuchsia-300 h-full text-center">
            <a href="" className="text-3xl">Gunakan QR Code untuk memasuki Main Event</a>
            {/* <Image className="rounded-3xl" src="" alt="qr_code" width="300" height="500"/> */}
            <div className="text-start">
              <h1 className="text-3xl">Vincent Valerian</h1>
              <h1 className="text-2xl"></h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}