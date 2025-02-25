"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { UserContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { ucwords } from '@/utils/helper';
import QRCode from 'react-qr-code';


export default function ProfilePage() {
  const t = useTranslations();
  const authUser = useContext(UserContext)
  
  return (
    <div className="flex-grow pb-8 bg-kv-2">
      <div className="flex flex-col max-w-screen-2xl mx-auto py-4 px-4 lg:px-16">
        <div className="flex w-full justify-between mb-4 lg:mb-8">
          <div>
            <h1 className="text-lg lg:text-7xl font-bold">PROFILE</h1>
          </div>
          <div>
            <Image src="/game-on-logo.png" alt="logo" width="200" height="128" className='w-[50px] lg:w-[200px]'/>
          </div>
        </div>
        <div className="w-full p-6 lg:p-8 rounded-3xl bg-kv-gradient text-white my-2 lg:my-4">
          <div className="grid grid-cols-2">
            {authUser?.showAttendanceQr && (
              <div className="col-span-full lg:col-span-1">
                <a href="" className="text-xl lg:text-2xl font-bold">{t('ProfilePage.description')}</a>
                {/* <Image className="rounded-3xl my-4 col-span-full lg:col-span-1 mx-auto" src="/qr_example.png" alt="qr_code" width="300" height="500"/> */}
                <div className="h-[300px] w-[300px] rounded-3xl bg-white my-4 p-4  mx-auto">
                  {authUser?.id && (
                    <QRCode
                      value={authUser?.id}
                      style={{height: "auto", width: "100%"}}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 text-start col-span-full lg:col-span-1 justify-center">
              <p className="text-base lg:text-2xl font-bold">{authUser?.name}</p>
              <p className="text-base lg:text-2xl">{authUser?.email}</p>
              {/* <p className="text-base lg:text-2xl">{authUser?.jobPosition}</p> */}
              <p className="text-base lg:text-2xl">{t('ProfilePage.regionOffice')}: {authUser?.placement ? ucwords(authUser?.placement) : ''}</p>
              <p className="text-base lg:text-2xl">Venue: {authUser?.venue}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}