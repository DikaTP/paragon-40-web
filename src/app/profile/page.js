import {useLocale, useTranslations} from 'next-intl';
export default function ProfilePage() {
  const t = useTranslations('ProfilePage');
  
  return (
    <div>{t('title')}</div>
  );
}