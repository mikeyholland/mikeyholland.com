'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion';

export default function HorizontalScroll({
  children,
  topContent,
  bottomContent,
  zIndex = 10,
}: {
  children: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  zIndex?: number;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollPaneRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stickyTop, setStickyTop] = useState(32);
  const [currentIndex, setCurrentIndex] = useState(1);

  const totalItems = React.Children.count(children);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      totalItems,
      Math.max(1, Math.ceil(latest * totalItems)),
    );
    setCurrentIndex(idx);
  });

  useEffect(() => {
    const calculateDimensions = () => {
      if (scrollPaneRef.current && stickyRef.current) {
        const { scrollWidth } = scrollPaneRef.current;
        const viewportWidth = window.innerWidth;
        const viewportHeight = document.documentElement.clientHeight;

        const mobile = viewportWidth < 768;
        setIsMobile(mobile);

        const buffer = mobile ? 25 : 75;
        const distance = scrollWidth - viewportWidth + buffer;
        setScrollDistance(distance);

        const contentHeight = stickyRef.current.offsetHeight;
        setStickyHeight(contentHeight);

        if (!mobile) {
          const desiredTopRatio = viewportWidth >= 1280 ? 0.1 : 0.05;
          const desiredTop = viewportHeight * desiredTopRatio;
          const padding = 16;
          const maxTop = Math.max(
            padding,
            viewportHeight - contentHeight - padding,
          );
          setStickyTop(Math.round(Math.min(desiredTop, maxTop)));
        } else {
          setStickyTop(56);
        }
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    const timeoutId1 = setTimeout(calculateDimensions, 100);
    const timeoutId2 = setTimeout(calculateDimensions, 500);
    const timeoutId3 = setTimeout(calculateDimensions, 1000);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [children, topContent, bottomContent]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const containerHeight = isMobile
    ? scrollDistance + stickyHeight
    : scrollDistance +
      (typeof window !== 'undefined'
        ? document.documentElement.clientHeight * 2
        : 0);

  return (
    <div
      ref={targetRef}
      className="relative"
      style={{
        height: `${containerHeight}px`,
      }}
    >
      <div
        ref={stickyRef}
        className="sticky"
        style={{ zIndex, top: stickyTop }}
      >
        {/* Top row: content + progress counter */}
        <div className="flex items-end justify-between mb-0 ">
          <div className="flex-1">{topContent}</div>
          {totalItems > 1 && (
            <div className="flex items-baseline gap-1 pb-4 shrink-0 ml-4 tabular-nums text-sm font-bold select-none">
              <span>{String(currentIndex).padStart(2, '0')}</span>
              <span className="opacity-25 text-xs">/</span>
              <span className="opacity-25">
                {String(totalItems).padStart(2, '0')}
              </span>
            </div>
          )}
        </div>

        {!isMobile && bottomContent}

        <div className="flex items-center overflow-hidden -mx-4 px-4 md:-mx-8 md:px-8">
          <motion.div
            ref={scrollPaneRef}
            style={{ x }}
            className="flex gap-4 will-change-transform"
          >
            {children}
          </motion.div>
        </div>

        {isMobile && bottomContent}
      </div>
    </div>
  );
}
