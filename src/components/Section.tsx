'use client';

import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';

type SectionType = {
  id?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  bgColor: string;
  textColor: 'Black' | 'White';
  style?: React.CSSProperties;
};

export const Section = forwardRef<HTMLElement, SectionType>(
  ({ id, className, children, bgColor, textColor, style }, forwardedRef) => {
    const { setBgColor } = useContext(BgContext);
    const { setTextColor } = useContext(TextContext);
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      const element = sectionRef.current;
      if (!element) return undefined;

      const handleScroll = () => {
        const rect = element.getBoundingClientRect();
        // top-8 = 32px on mobile, top-16 = 64px on desktop
        const stickyPosition = window.innerWidth < 768 ? 32 : 64;
        // Trigger earlier by adding offset (trigger when section is 400px away from sticky position)
        const triggerOffset = 400;

        // Section is active if its top is approaching or past sticky position
        // and its bottom is below sticky position
        const isNowActive =
          rect.top <= stickyPosition + triggerOffset &&
          rect.bottom > stickyPosition;

        setIsActive(isNowActive);
      };

      handleScroll(); // Check initial state
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }, []);

    useEffect(() => {
      if (isActive) {
        setBgColor(bgColor);
        setTextColor(textColor);
      }
    }, [isActive, bgColor, textColor, setBgColor, setTextColor]);

    const setRefs = (node: HTMLElement | null) => {
      sectionRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef && 'current' in forwardedRef) {
        // eslint-disable-next-line no-param-reassign
        forwardedRef.current = node;
      }
    };

    return (
      <section
        id={id}
        style={style}
        ref={setRefs}
        className={clsx(
          'w-full first:mt-0 first:mb-56 px-4 py-6 my-96 md:px-8 md:pb-96 md:first:pb-24 last:md:pb-0 last:mb-0 relative',
          className,
        )}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = 'Section';
