'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';

export default function HorizontalScroll({
  children,
  topContent,
  bottomContent,
  zIndex = 10,
  showScrollHint = false,
}: {
  children: React.ReactNode;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  zIndex?: number;
  showScrollHint?: boolean;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollPaneRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stickyTop, setStickyTop] = useState(32);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasScrolled, setHasScrolled] = useState(false);

  const totalItems = React.Children.count(children);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(totalItems, Math.max(1, Math.ceil(latest * totalItems)));
    setCurrentIndex(idx);
    if (latest > 0.03) setHasScrolled(true);
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
          const maxTop = Math.max(padding, viewportHeight - contentHeight - padding);
          setStickyTop(Math.round(Math.min(desiredTop, maxTop)));
        } else {
          setStickyTop(32);
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
        <div className="flex items-end justify-between mb-0">
          <div className="flex-1">{topContent}</div>
          {totalItems > 1 && (
            <div className="flex items-baseline gap-1 pb-4 shrink-0 ml-4 tabular-nums text-sm font-bold select-none">
              <span>{String(currentIndex).padStart(2, '0')}</span>
              <span className="opacity-25 text-xs">/</span>
              <span className="opacity-25">{String(totalItems).padStart(2, '0')}</span>
            </div>
          )}
        </div>

        {!isMobile && bottomContent}

        <div className="flex items-center overflow-hidden -mx-8 px-8">
          <motion.div
            ref={scrollPaneRef}
            style={{ x }}
            className="flex gap-4 will-change-transform"
          >
            {children}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-3 -mx-8 h-px bg-current opacity-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-persianGreen opacity-100 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <motion.div
            className="flex items-center gap-1.5 mt-3 text-xs opacity-50 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 0 : 0.5 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span>scroll to explore</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>
        )}

        {isMobile && bottomContent}
      </div>
    </div>
  );
}
