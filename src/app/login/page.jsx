import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitch from '@/components/LocaleSwitch';
import LoginForm from './LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const locale = useLocale();

  const loginTtl = () => {
    return (
      <>
        <span className="text-primary">{t('titleHighlight')}</span> {t('title')}
      </>
    );
  };

  return (
    <div className="flex flex-col max-w-[1040px] mx-auto">
      <div className="">
        <div className="py-4 px-4 mb-8">
          <Image src="/p40-logo.png" alt="logo" width="100" height="67" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 py-8 lg:py-16 px-8 lg:pl-16">
        <div className="w-full">
          <div className="flex mb-6">
            <LocaleSwitch />
          </div>
          <h1 className="text-2xl lg:text-6xl font-semibold mb-2">
            {loginTtl()}
          </h1>
          <p className="lg:text-3xl text-primary mb-6 lg:font-bold">#G4MEON</p>
          <p className="lg:text-xl mb-2">{t('description')}</p>
          <LoginForm />
        </div>
        <div className="w-full hidden lg:block">
          <Image src="/bg-kv-1.png" alt="home-right-img"
            width={4096} height={2304}
            sizes="100vw"
            style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left' }} />
        </div>
      </div>
      <Image src="/game-on-logo.png" alt="logo" className="w-40 absolute top-6 lg:top-auto lg:bottom-6 right-6" width="200" height="128" />
    </div>
  );
}