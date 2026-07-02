'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';

const TOLERANCE = 50;

function getSections(): HTMLElement[] {
  const about = document.getElementById('about');
  const projects = Array.from(
    document.querySelectorAll<HTMLElement>('[id^="project-"]'),
  ).sort((a, b) => {
    const n = (el: HTMLElement) => parseInt(el.id.replace('project-', ''), 10);
    return n(a) - n(b);
  });
  return [about, ...projects].filter((el): el is HTMLElement => el !== null);
}

function getTargets(sections: HTMLElement[]): number[] {
  const stickyPos = window.innerWidth < 768 ? 32 : 64;
  return sections.map((s) =>
    Math.max(0, s.getBoundingClientRect().top + window.scrollY - stickyPos),
  );
}

function getCurrentIdx(targets: number[], currentY: number): number {
  let idx = 0;
  for (let i = 0; i < targets.length; i += 1) {
    if (targets[i] <= currentY + TOLERANCE) idx = i;
  }
  return idx;
}

export default function ScrollArrows() {
  const { footerActive } = useContext(BgContext);
  const { textColor } = useContext(TextContext);
  const [visible, setVisible] = useState(false);
  const [canGoUp, setCanGoUp] = useState(false);
  const [canGoDown, setCanGoDown] = useState(true);
  const prevScrollY = useRef(0);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateBoundaries = (currentY: number) => {
      const sections = getSections();
      const targets = getTargets(sections);
      const idx = getCurrentIdx(targets, currentY);
      setCanGoUp(idx > 0);
      setCanGoDown(idx < sections.length - 1);
    };

    showTimer.current = setTimeout(() => {
      updateBoundaries(window.scrollY);
      setVisible(true);
    }, 1000);

    const handleScroll = () => {
      prevScrollY.current = window.scrollY;
      setVisible(false);
      clearTimeout(showTimer.current);
      showTimer.current = setTimeout(() => {
        updateBoundaries(window.scrollY);
        setVisible(true);
      }, 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(showTimer.current);
    };
  }, []);

  const navigate = useCallback((direction: 'up' | 'down') => {
    const sections = getSections();
    const targets = getTargets(sections);
    const idx = getCurrentIdx(targets, window.scrollY);
    const dest = direction === 'down' ? idx + 1 : idx - 1;
    if (dest >= 0 && dest < sections.length) {
      window.scrollTo({ top: targets[dest], behavior: 'smooth' });
    }
  }, []);

  const buttonClass =
    textColor === 'White'
      ? 'bg-honeydew/80 text-eerieBlack hover:bg-honeydew'
      : 'bg-eerieBlack/80 text-honeydew hover:bg-eerieBlack';

  const show = visible && !footerActive;

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden md:flex gap-2">
      <AnimatePresence>
        {show && canGoUp && (
          <motion.button
            key="up"
            onClick={() => navigate('up')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm transition-colors ${buttonClass}`}
            aria-label="Previous section"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && canGoDown && (
          <motion.button
            key="down"
            onClick={() => navigate('down')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer backdrop-blur-sm transition-colors ${buttonClass}`}
            aria-label="Next section"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
