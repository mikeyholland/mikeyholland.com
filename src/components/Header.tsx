import React from 'react';
import Image from 'next/image';
import { SanityImageAssetDocument } from 'next-sanity';

import AnimatedTypingComponent from '@components/AnimatedTyping';
import GithubIcon from '@components/icons/GithubIcon';
import LinkedInIcon from '@components/icons/LinkedInIcon';
import YunoJunoIcon from '@components/icons/YunoJunoIcon';

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
      <div className="md:flex gap-4 md:gap-6 items-center">
        <div className="relative flex items-center shrink-0 justify-center w-20 h-20 md:w-52 md:h-52 mb-4 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            className="w-full block object-cover object-center"
            fill
            placeholder="blur"
            blurDataURL={image.asset.metadata.lqip}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-3xl lg:text-7xl md:mb-2">{name}</h1>
          <h2
            className="text-burntUmber italic md:text-2xl"
            aria-label={jobTitles[0]}
          >
            <AnimatedTypingComponent
              values={jobTitles}
              className="h-6 md:h-8"
            />
          </h2>
          <ul className="flex flex-wrap items-center gap-2 md:gap-4">
            <li className="w-full md:w-auto">
              <a className="underline" href="mailto:mpjholland@gmail.com">
                hello@mikeyholland.com
              </a>
            </li>
            <li className="w-auto">
              <a target="_blank" href="https://github.com/mikeyholland">
                <span className="sr-only">Mikey Holland on Github</span>
                <GithubIcon className="w-4 h-4 md:w-7 md:h-7 rounded-full" />
              </a>
            </li>
            <li className="w-auto">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mikeyholland/"
              >
                <span className="sr-only">Mikey Holland on LinkedIn</span>
                <LinkedInIcon className="w-4 h-4 md:w-7 md:h-7 rounded-full" />
              </a>
            </li>
            <li className="w-auto">
              <a
                target="_blank"
                href="https://app.yunojuno.com/p/mikeyholland/"
              >
                <span className="sr-only">Hire Mikey Holland on YunoJuno</span>
                <YunoJunoIcon className="w-4 h-4 md:w-7 md:h-7 rounded-full" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
