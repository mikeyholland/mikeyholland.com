'use client';

import React, { useEffect, useState } from 'react';

export default function LiveContext() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="flex items-center gap-1.5 font-bold text-persianGreen">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-persianGreen opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-persianGreen" />
        </span>
        Available
      </span>
      <span className="opacity-20">·</span>
      <span className="opacity-50">London</span>
      {time && (
        <>
          <span className="opacity-20">·</span>
          <span className="tabular-nums opacity-50">{time}</span>
        </>
      )}
    </div>
  );
}
