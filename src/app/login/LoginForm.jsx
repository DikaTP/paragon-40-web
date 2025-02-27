'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { useActionState, useEffect, useState } from 'react';
import { authenticate } from '@/utils/auth/action';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

function LoginModalContent(props) {
  const t = useTranslations('LoginPage');
  let code = props?.code

  switch (code) {
    case 'success':
      return (
        <>
          <CheckCircleIcon className="pointer-events-none text-white w-32 h-32"/>
          <p className="text-lg text-white mt-8 font-bold">{t(code)}</p>
        </>
      )
    case 'invalid':
      return (
        <>
          <XCircleIcon className="pointer-events-none text-white w-32 h-32"/>
          <p className="text-lg text-white mt-8 font-bold">{t(code)}</p>
          <button onClick={() => props.modalHandler(false)}
            className="w-full bg-red-600 text-white mt-4 py-2 rounded-xl transition-all hover:enabled:opacity-80"
          >{t('close')}</button>
        </>
      )
    case 'error':
      return (
        <>
          <XCircleIcon className="pointer-events-none text-white w-32 h-32"/>
          <p className="text-lg text-white mt-8 font-bold">{t(code)}</p>
          <button onClick={() => props.modalHandler(false)}
            className="w-full bg-red-600 text-white mt-4 py-2 rounded-xl transition-all hover:enabled:opacity-80"
          >{t('close')}</button>
        </>
      )
    default:
      return (
        <>
          <div className="w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-white mt-8 font-bold">{t('loading')}</p>
        </>
      )
  }
}

export default function LoginForm() {
  const t = useTranslations('LoginPage');
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/home';
  const callbackUrl = '/';
  const [showModalLogin, setModalLogin] = useState(false)
  const [modalLoginCode, setModalLoginCode] = useState(undefined)
  const [actionData, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  useEffect(() => {
    if (isPending) {
      setModalLogin(true)
      setModalLoginCode(undefined)
    } else {
      setModalLoginCode(actionData?.code)
    }
  }, [actionData, isPending])

  const modalHandler = (showModal) => {
    setModalLogin(showModal)
  }

  return (
    <form action={formAction} className="space-y-3" noValidate={true}>
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
      </div>
      {showModalLogin && (
        <div className="absolute top-0 left-0 m-0 p-0 w-full h-full inset-0 flex justify-center items-center bg-gray-700 bg-opacity-25">
          <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg px-24 py-16 rounded-xl shadow-xl flex flex-col items-center">
            <LoginModalContent code={modalLoginCode} modalHandler={modalHandler} />
          </div>
        </div>
      )}
    </form>
  );
}