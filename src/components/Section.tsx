'use client';

import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useInView } from 'framer-motion';

import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';

type SectionType = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  bgColor: string;
  textColor: 'Black' | 'White';
};

export const Section = forwardRef<HTMLElement, SectionType>(
  ({ className, children, bgColor, textColor }, ref) => {
    const { setBgColor } = useContext(BgContext);
    const { setTextColor } = useContext(TextContext);
    const inViewRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(inViewRef);

    useEffect(() => {
      if (isInView) {
        setBgColor(bgColor);
        setTextColor(textColor);
      }
    }, [bgColor, isInView, setBgColor, setTextColor, textColor]);

    return (
      <section
        ref={ref}
        className="w-full flex items-center md:min-h-[500vh] first:mt-0 px-4 py-6 my-56 md:px-8 md:my-96 md:first:py-24 last:md:py-0 last:mb-0"
      >
        <span ref={inViewRef} />
        <div className={clsx('sticky top-32 mb-64', className)}>{children}</div>
      </section>
    );
  },
);

Section.displayName = 'Section';
