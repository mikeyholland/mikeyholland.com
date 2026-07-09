import React from 'react';
import Image from 'next/image';
import { SanityImageAssetDocument } from 'next-sanity';

import AnimatedTypingComponent from '@components/AnimatedTyping';
import GithubIcon from '@components/icons/GithubIcon';
import LinkedInIcon from '@components/icons/LinkedInIcon';
import LiveContext from '@components/LiveContext';

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
    <header className="mb-8">
      {/* Live context — top right */}
      <div className="flex justify-end mb-4 md:mb-8">
        <LiveContext />
      </div>

      {/* Giant display name */}
      <h1
        className="font-bold leading-[0.88] tracking-tight mb-5 md:mb-8"
        style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
      >
        {name}
      </h1>

      <h2
        className="text-burntUmber italic text-lg md:hidden mb-2"
        aria-label={jobTitles[0]}
      >
        <AnimatedTypingComponent values={jobTitles} className="md:h-6" />
      </h2>

      {/* Photo + subtitle + links */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="relative shrink-0 w-12 h-12 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            className="w-full block object-cover object-center"
            fill
            placeholder="blur"
            blurDataURL={image.asset.metadata.lqip}
          />
        </div>

        <div className="flex flex-col md:gap-1.5">
          <h2
            className="text-burntUmber italic hidden md:block md:text-base lg:text-xl"
            aria-label={jobTitles[0]}
          >
            <AnimatedTypingComponent values={jobTitles} className="md:h-6" />
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
      </div>
    </header>
  );
}
