'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const calculateDimensions = () => {
      if (scrollPaneRef.current && stickyRef.current) {
        const { scrollWidth } = scrollPaneRef.current;
        const viewportWidth = window.innerWidth;

        setIsMobile(viewportWidth < 768);

        const buffer = isMobile ? 25 : 75;
        const distance = scrollWidth - viewportWidth + buffer;
        setScrollDistance(distance);

        // Measure the actual height of sticky content
        const contentHeight = stickyRef.current.offsetHeight;
        setStickyHeight(contentHeight);
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
  }, [children, topContent, bottomContent, isMobile]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Mobile: scrollDistance + sticky content height
  // Desktop: scrollDistance + 2x viewport height for extended scroll
  const containerHeight = isMobile
    ? scrollDistance + stickyHeight
    : scrollDistance +
      (typeof window !== 'undefined' ? window.innerHeight * 2 : 0);

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
        className="sticky top-8 md:top-[5%] xl:top-[10%]"
        style={{ zIndex }}
      >
        {topContent}
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
        {isMobile && bottomContent}
      </div>
    </div>
  );
}
