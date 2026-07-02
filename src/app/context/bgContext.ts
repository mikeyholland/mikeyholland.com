'use client';

import { createContext, SetStateAction, Dispatch } from 'react';

export type TextColorType = 'Black' | 'White';

export interface BgContextType {
  bgColor: string | undefined;
  setBgColor: Dispatch<SetStateAction<string>>;
  footerActive: boolean;
  setFooterActive: Dispatch<SetStateAction<boolean>>;
}

export const BgContext = createContext<BgContextType>({
  bgColor: '#F1FAEE',
  setBgColor: () => {},
  footerActive: false,
  setFooterActive: () => {},
});
