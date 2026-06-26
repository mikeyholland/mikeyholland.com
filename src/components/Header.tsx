'use client';

import React from 'react';
import Image from 'next/image';
import { SanityImageAssetDocument } from 'next-sanity';
import { motion } from 'framer-motion';

import AnimatedTypingComponent from '@components/AnimatedTyping';
import GithubIcon from '@components/icons/GithubIcon';
import LinkedInIcon from '@components/icons/LinkedInIcon';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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
    <header>
      <motion.div
        className="md:flex gap-4 md:gap-6 items-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.div
          variants={imageItem}
          className="relative flex items-center shrink-0 justify-center w-20 h-20 md:w-52 md:h-52 mb-4 rounded-full overflow-hidden"
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
        <div className="flex flex-col gap-1">
          <motion.h1
            variants={item}
            className="font-bold text-3xl lg:text-7xl md:mb-2"
          >
            {name}
          </motion.h1>
          <motion.h2
            variants={item}
            className="text-burntUmber italic md:text-2xl"
            aria-label={jobTitles[0]}
          >
            <AnimatedTypingComponent
              values={jobTitles}
              className="h-6 md:h-8"
            />
          </motion.h2>
          <motion.ul
            variants={item}
            className="flex flex-wrap items-center gap-2 md:gap-4"
          >
            <li className="w-full md:w-auto">
              <a
                className="underline decoration-eerieBlack/30 hover:decoration-persianGreen hover:text-persianGreen transition-colors"
                href="mailto:mpjholland@gmail.com"
              >
                hello@mikeyholland.com
              </a>
            </li>
            <li className="w-auto">
              <a
                target="_blank"
                href="https://github.com/mikeyholland"
                className="text-eerieBlack hover:text-persianGreen transition-colors block"
              >
                <span className="sr-only">Mikey Holland on Github</span>
                <GithubIcon className="w-4 h-4 md:w-7 md:h-7 rounded-full" />
              </a>
            </li>
            <li className="w-auto">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mikeyholland/"
                className="text-eerieBlack hover:text-persianGreen transition-colors block"
              >
                <span className="sr-only">Mikey Holland on LinkedIn</span>
                <LinkedInIcon className="w-4 h-4 md:w-7 md:h-7 rounded-full" />
              </a>
            </li>
          </motion.ul>
        </div>
      </motion.div>
    </header>
  );
}
