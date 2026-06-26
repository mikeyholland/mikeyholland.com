import React from 'react';

import { SanityDocument } from 'next-sanity';

import Header from '@components/Header';
import { Section } from '@components/Section';
import RichText from '@components/RichText';
import { urlForImage } from '../../sanity/lib/image';
import { sanityFetch } from '../../sanity/client';

const ABOUT_QUERY = `
  *[_type == "about"][0] {
    ...,
    image {
      asset->{
        ...,
        metadata
      }
		}
  }
`;

export default async function About() {
  const about = await sanityFetch<SanityDocument>({
    query: ABOUT_QUERY,
  });

  const { name, about: aboutBlock, image, jobTitles, how } = about;

  const imageUrl = urlForImage(image);

  return (
    <Section bgColor="#F1FAEE" textColor="Black">
      <div className="flex flex-col justify-center pt-[5%] md:pt-0">
        <Header
          name={name}
          image={image}
          imageUrl={imageUrl}
          jobTitles={jobTitles}
        />
        <div className="lg:flex gap-12 my-6">
          <div className="lg:w-1/2 mb-8">
            <h3 className="font-bold text-lg md:text-2xl mb-4 md:mb-8">
              About
            </h3>
            <RichText
              value={aboutBlock}
              className="text-sm md:text-base lg:text-lg 2xl:text-xl"
            />
          </div>
          <div className="lg:w-1/2 mb-8">
            <h3 className="font-bold text-lg md:text-2xl mb-4 md:mb-8">
              How I work
            </h3>
            <RichText
              value={how}
              className="text-sm md:text-base lg:text-lg 2xl:text-xl"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
