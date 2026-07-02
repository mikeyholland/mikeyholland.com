'use client';

import React, { useState, useMemo } from 'react';
import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [bgColor, setBgColor] = useState('#F1FAEE');
  const [textColor, setTextColor] = useState('Black');
  const [footerActive, setFooterActive] = useState(false);

  const memoBgValue = useMemo(
    () => ({
      bgColor,
      setBgColor,
      footerActive,
      setFooterActive,
    }),
    [bgColor, footerActive],
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
