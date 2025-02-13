'use client';

import { useFormStatus } from 'react-dom';

export default function Button(props) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-primary text-white py-2 rounded-xl transition-all hover:enabled:opacity-80 disabled:opacity-60"
      disabled={pending}
      type="button"
      {...props}
    />
  );
}