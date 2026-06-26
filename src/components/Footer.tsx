'use client';

import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { BgContext } from 'src/app/context/bgContext';
import { TextContext } from 'src/app/context/textContext';
import GithubIcon from 'src/components/icons/GithubIcon';
import LinkedInIcon from 'src/components/icons/LinkedInIcon';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Footer() {
  const { setBgColor } = useContext(BgContext);
  const { setTextColor } = useContext(TextContext);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const stickyPosition = window.innerWidth < 768 ? 32 : 64;
      const triggerOffset = 400;
      const isActive =
        rect.top <= stickyPosition + triggerOffset &&
        rect.bottom > stickyPosition;

      if (isActive) {
        setBgColor('#F1FAEE');
        setTextColor('Black');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setBgColor, setTextColor]);

  return (
    <footer
      ref={ref}
      className="w-full px-4 md:px-8 pt-24 pb-8 md:pt-40 md:pb-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        className="flex flex-col gap-10"
      >
        {/* Available for work indicator */}
        <motion.div variants={fadeUp} className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-persianGreen opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-persianGreen" />
          </span>
          <span className="text-sm font-bold text-persianGreen">
            Available for work
          </span>
        </motion.div>

        {/* Main CTA */}
        <div>
          <motion.p variants={fadeUp} className="text-sm text-paynesGray mb-3">
            Let's build something together
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="mailto:mpjholland@gmail.com"
            className="group inline-block"
          >
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight break-all md:break-normal">
              hello@mikeyholland.com
            </h2>
            <span className="block h-0.5 bg-persianGreen w-0 group-hover:w-full transition-all duration-500 mt-1.5" />
          </motion.a>
        </div>

        {/* Bottom row */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between pt-6 border-t border-eerieBlack/10"
        >
          <p className="text-xs text-paynesGray">
            © {new Date().getFullYear()} Mikey Holland
          </p>
          <ul className="flex items-center gap-4">
            <li>
              <a
                target="_blank"
                href="https://github.com/mikeyholland"
                className="text-eerieBlack hover:text-persianGreen transition-colors block"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Mikey Holland on Github</span>
                <GithubIcon className="w-5 h-5" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mikeyholland/"
                className="text-eerieBlack hover:text-persianGreen transition-colors block"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Mikey Holland on LinkedIn</span>
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}
