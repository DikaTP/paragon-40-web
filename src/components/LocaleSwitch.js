import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitchSelect';

export default function LocaleSwitch() {
  const t = useTranslations('LocaleSwitch');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en'),
        },
        {
          value: 'id',
          label: t('id'),
        },
      ]}
      label={t('label')}
    />
  );
}