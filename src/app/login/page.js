import {useLocale, useTranslations} from 'next-intl';
export default function LoginPage() {
  const t = useTranslations('LoginPage');
  
  return (
    <div>{t('title')}</div>
  );
}