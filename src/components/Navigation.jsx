'use client';

import { Suspense, useContext, useState } from "react";
import { useTranslations } from 'next-intl';
import NavLink from '@/components/NavLink';
import Image from 'next/image';
import LocaleSwitch from '@/components/LocaleSwitch';
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { UserContext } from "@/app/providers/AuthProvider";



export default function Navigation() {
  const t = useTranslations();
  const authUser = useContext(UserContext)
    
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  function toggleMobileMenuOpen() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isDropdownProfileOpen, setIsDropdownProfileOpen] = useState(false);
  function toggleDropdownProfileOpen() {
    setIsDropdownProfileOpen(!isDropdownProfileOpen);
  };

  return (
    <div className="">
      <div className="mx-auto flex max-w-screen-2xl items-end justify-between py-4 px-4 lg:px-16 lg:mb-8">
        <Image src="/p40-logo.png" alt="logo" width="100" height="67" className='w-[60] lg:w-[100]' />
        <div className="hidden lg:block">
          <nav className="flex gap-6">
            <NavLink href="/home">{t('home')}</NavLink>
            <NavLink href="/about">{t('about')}</NavLink>
            <NavLink href="/pre-event">Pre-Event</NavLink>
            <NavLink href="/main-event">Main Event</NavLink>
          </nav>
        </div>
        <div className="hidden lg:flex gap-4">
          <div className="relative">
            <button type="button" onClick={toggleDropdownProfileOpen} className="text-left flex items-center gap-2">
              <div className="">
                <p className="font-bold max-w-36 text-ellipsis text-nowrap overflow-hidden">{authUser?.name || ''}</p>
                <p className="text-sm">Region: {authUser?.region || ''}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div className={clsx("absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-transparent-nav ring-1 shadow-lg ring-black/5 focus:outline-hidden", !isDropdownProfileOpen && 'hidden')} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="flex flex-col gap-4 p-4" role="none">
                <NavLink onClick={toggleDropdownProfileOpen} href="/profile">{t('profile')}</NavLink>
                <button onClick={() => signOut()} className="border rounded-full px-6 py-2 bg-red-500 text-center text-white">Log Out</button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <LocaleSwitch />
          </div>
        </div>
        <div className="block lg:hidden">
          <button type='button' className='inline-flex items-center p-2 justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500' onClick={toggleMobileMenuOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className={clsx("absolute top-0 left-0 w-screen h-screen bg-indigo-200 flex flex-col z-10", !isMobileMenuOpen && 'hidden' )}>
        <div className="p-4 flex justify-between">
          <Image src="/p40-logo.png" alt="logo" width="60" height="39"/>
          <button type='button' className='inline-flex items-center text-white p-2 justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500' onClick={toggleMobileMenuOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center">
            <LocaleSwitch />
          </div>
          <h4 className="text-lg text-white my-8">Menu</h4>
          <div className="flex flex-col gap-6">
            <NavLink onClick={toggleMobileMenuOpen} href="/home">{t('home')}</NavLink>
            <NavLink onClick={toggleMobileMenuOpen} href="/about">{t('about')}</NavLink>
            <NavLink onClick={toggleMobileMenuOpen} href="/pre-event">Pre-Event</NavLink>
            <NavLink onClick={toggleMobileMenuOpen} href="/main-event">Main Event</NavLink>
          </div>
        </div>
        <div className="flex flex-grow flex-col p-8 justify-end gap-4">
          <h4 className="text-lg text-white">Profile</h4>
          <div className="">
            <p className="text-white">{authUser?.name || ''}</p>
            <p className="text-white text-sm">Region: {authUser?.region || ''}</p>
          </div>
          <NavLink onClick={toggleMobileMenuOpen} href="/profile">{t('profile')}</NavLink>

          <button onClick={() => signOut()} className="border rounded-full px-6 py-2 bg-red-500 text-center text-white">Log Out</button>
        </div>
      </div>
    </div>
  )
}