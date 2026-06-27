'use client';

import React, { useState, useMemo } from 'react';
import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [bgColor, setBgColor] = useState('#F1FAEE');
  const [textColor, setTextColor] = useState('Black');

  const memoBgValue = useMemo(
    () => ({
      bgColor,
      setBgColor,
    }),
    [bgColor],
  );

  const memoTextValue = useMemo(
    () => ({
      textColor,
      setTextColor,
    }),
    [textColor],
  );

  return (
    <BgContext.Provider value={memoBgValue}>
      <TextContext.Provider value={memoTextValue}>
        {children}
      </TextContext.Provider>
    </BgContext.Provider>
  );
}
