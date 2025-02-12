import { isEqual } from 'lodash';
import { redirect } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { z } from 'zod';
import LocaleSwitch from '@/components/LocaleSwitch';
import LoginForm from './LoginForm';
import { Suspense } from 'react';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

async function loginAction(prev, data) {
  'use server';

  const t = await getTranslations('LoginPage');
  const values = Object.fromEntries(data);

  const result = await loginFormSchema
    .refine(async (credentials) => loginUser(credentials), {
      message: t('invalidCredentials'),
    })
    .safeParseAsync(values, {
      errorMap(issue, ctx) {
        let message;

        if (isEqual(issue.path, ['email'])) {
          message = t('invalidEmail');
        } else if (isEqual(issue.path, ['password'])) {
          message = t('invalidPassword');
        }

        return { message: message || ctx.defaultError };
      },
    });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    };
  } else {
    redirect('/home');
  }
}

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const locale = useLocale();

  return (
    <>
      <div className="absolute right-8 top-8">
        <LocaleSwitch />
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}