'use client';

import { CheckIcon, LanguageIcon } from '@heroicons/react/24/solid';
import * as Select from '@radix-ui/react-select';
import { useTransition } from 'react';
import { setUserLocale } from '@/services/locale';

export default function LocaleSwitchSelect({
  defaultValue,
  items
}) {
  const [isPending, startTransition] = useTransition();

  function onChange(value) {
    const locale = value;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="flex gap-2">
      {items.map((item) => (
          <button key={item.value}
            className={`px-4 py-2
              rounded-full border-2
              border-secondary-100 font-bold cursor-pointer
              ${defaultValue === item.value ? "bg-secondary-100 text-white" : "text-primary"}
              hover:bg-secondary-100 hover:text-white`
            }
            onClick={() => onChange(item.value)}
          >{item.value.toUpperCase()}</button>
      ))}
    </div>
  )
}