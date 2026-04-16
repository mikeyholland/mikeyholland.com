'use client';

import React, { useContext } from 'react';
import clsx from 'clsx';
import { PortableTextBlock } from 'next-sanity';

import { TextContext } from 'src/app/context/textContext';
import RichText from 'src/components/RichText';

export default function Skills({
  heading,
  items,
  className,
  intro,
}: {
  heading: string;
  items: string[];
  className?: string;
  intro?: PortableTextBlock;
}) {
  const { textColor } = useContext(TextContext);

  return (
    <div className={className}>
      <h3 className="font-bold mb-4 text-xl">{heading}</h3>
      {intro && <RichText value={intro} className="mb-4" />}
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          if (item === '') return null;
          return (
            <li
              key={item}
              className={clsx(
                'p-2 rounded font-bold text-xs md:text-base transition-colors cursor-default',
                textColor === 'Black'
                  ? 'bg-eerieBlack text-white hover:bg-persianGreen'
                  : 'bg-white text-eerieBlack hover:bg-persianGreen hover:text-white',
              )}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
