"use client"

import { useTranslations } from 'next-intl';
import LocaleSwitch from '@/components/LocaleSwitch';
import NavLink from '@/components/NavLink';
import ListItems from '@/components/ListItems';
import AddItem from '@/components/AddItems'

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="flex grow flex-col">
      <div className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-2xl items-end justify-between">
          <nav className="flex gap-6 pt-6">
            <NavLink href="/home">{t('home')}</NavLink>
            <NavLink href="/profile">{t('profile')}</NavLink>
          </nav>
          <div className="mb-[2px] flex items-center">
            <LocaleSwitch />
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-2xl grow flex-col py-10">
        <h1>Polls</h1>
        <AddItem />
        <ListItems />
      </div>
    </div>
  );
}