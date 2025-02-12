'use server';

import { cookies } from 'next/headers';
import { defaultLocale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies(); // Await the cookies() function
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale) {
  const cookieStore = await cookies(); // Await the cookies() function
  cookieStore.set(COOKIE_NAME, locale);
}