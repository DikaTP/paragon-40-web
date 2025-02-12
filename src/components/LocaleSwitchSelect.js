'use client';

import { CheckIcon, LanguageIcon } from '@heroicons/react/24/solid';
import * as Select from '@radix-ui/react-select';
import { useTransition } from 'react';
import { setUserLocale } from '@/services/locale';

export default function LocaleSwitchSelect({
  defaultValue,
  items,
  label
}) {
  const [isPending, startTransition] = useTransition();

  function onChange(value) {
    const locale = value;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={'rounded-sm p-2 transition-colors hover:bg-slate-200'}
        >
          <Select.Icon>
            <LanguageIcon className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === defaultValue && (
                      <CheckIcon className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}