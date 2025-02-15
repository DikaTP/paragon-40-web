'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { useActionState } from 'react';
import { authenticate } from '@/utils/auth/action';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  const t = useTranslations('LoginPage');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-sm font-medium text-gray-900"
            htmlFor="email"
          >
            {t('email')}
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-xl py-[9px] pl-10 text-sm outline-none placeholder:text-gray-600"
              id="email"
              type="email"
              name="email"
              placeholder={t('emailPlaceholder')}
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-sm font-medium text-gray-900"
            htmlFor="password"
          >
            {t('password')}
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-xl py-[9px] pl-10 text-sm outline-none placeholder:text-gray-600"
              id="password"
              type="password"
              name="password"
              placeholder={t('passwordPlaceholder')}
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <div className="mt-4"></div>
      <Button type="submit" aria-disabled={isPending}>{t('login')}</Button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      {/* {isPending && (
        <div className="absolute top-0 left-0 m-0 p-0 w-full h-full inset-0 flex justify-center items-center bg-gray-700 bg-opacity-25">
          <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg px-24 py-16 rounded-xl shadow-xl flex flex-col items-center">
            <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-white mt-8 font-bold">Loading ...</p>
          </div>
        </div>
      )} */}
    </form>
  );
}