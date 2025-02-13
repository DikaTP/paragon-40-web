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
        {locale === 'en' ? (
          <>
            <span className="text-primary">{t('titleHighlight')}</span> {t('title')}
          </>
        ) : (
          <>
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col max-w-[1040px] mx-auto">
      <div className="">
        <div className="py-4 mb-8">
          <Image src="/p40-logo.png" alt="logo" width="100" height="67" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 py-16 pl-16">
        <div className="w-full">
          <div className="flex mb-6">
            <LocaleSwitch />
          </div>
          <h1 className="text-6xl font-semibold mb-2">
            {loginTtl()}
          </h1>
          <p className="text-3xl text-primary mb-6 font-bold">#G4MEON</p>
          <p className="text-xl mb-2">{t('description')}</p>
          <LoginForm />
        </div>
        <div className="w-full">
          <Image src="/home-right-img.webp" alt="home-right-img" width={200}
            height={160}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      <Image src="/game-on-logo.png" alt="logo" className="w-40 absolute bottom-6 right-6" width="200" height="128" />
    </div>
  );
}