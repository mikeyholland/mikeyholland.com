'use client';

import React from 'react';
import Image from 'next/image';
import { SanityImageAssetDocument } from 'next-sanity';
import { motion } from 'framer-motion';

import AnimatedTypingComponent from '@components/AnimatedTyping';
import GithubIcon from '@components/icons/GithubIcon';
import LinkedInIcon from '@components/icons/LinkedInIcon';
import LiveContext from '@components/LiveContext';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageItem = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Header({
  name,
  imageUrl,
  image,
  jobTitles,
}: {
  name: string;
  imageUrl: string;
  image: SanityImageAssetDocument;
  jobTitles: string[];
}) {
  return (
    <header className="mb-8 md:mb-12">
      <motion.div initial="hidden" animate="visible" variants={container}>
        {/* Live context — top right */}
        <motion.div variants={item} className="flex justify-end mb-4 md:mb-8">
          <LiveContext />
        </motion.div>

        {/* Giant display name */}
        <motion.h1
          variants={nameItem}
          className="font-bold leading-[0.88] tracking-tight mb-5 md:mb-8"
          style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
        >
          {name}
        </motion.h1>

        {/* Photo + subtitle + links */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 md:gap-5"
        >
          <motion.div
            variants={imageItem}
            className="relative shrink-0 w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden"
          >
            <Image
              src={imageUrl}
              alt={name}
              className="w-full block object-cover object-center"
              fill
              placeholder="blur"
              blurDataURL={image.asset.metadata.lqip}
            />
          </motion.div>

          <div className="flex flex-col gap-1.5">
            <h2
              className="text-burntUmber italic text-sm md:text-base lg:text-xl"
              aria-label={jobTitles[0]}
            >
              <AnimatedTypingComponent
                values={jobTitles}
                className="h-5 md:h-6"
              />
            </h2>
            <ul className="flex flex-wrap items-center gap-2 md:gap-4">
              <li className="w-full md:w-auto">
                <a
                  className="text-sm underline decoration-eerieBlack/30 hover:decoration-persianGreen hover:text-persianGreen transition-colors"
                  href="mailto:mpjholland@gmail.com"
                >
                  hello@mikeyholland.com
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/mikeyholland"
                  className="text-eerieBlack hover:text-persianGreen transition-colors block"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Mikey Holland on Github</span>
                  <GithubIcon className="w-4 h-4 md:w-5 md:h-5" />
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
                  <LinkedInIcon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
