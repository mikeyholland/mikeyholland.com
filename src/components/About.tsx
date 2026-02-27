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

  const { name, about: aboutBlock, image, jobTitles } = about;

  const imageUrl = urlForImage(image);

  return (
    <Section bgColor="#F1FAEE" textColor="Black">
      <div className="flex flex-col justify-center pt-[5%]">
        <Header
          name={name}
          image={image}
          imageUrl={imageUrl}
          jobTitles={jobTitles}
        />
        <div className="lg:flex gap-12 my-6">
          <div className="max-w-prose mb-8">
            <RichText value={aboutBlock} className="text-sm md:text-base" />
          </div>
        </div>
      </div>
    </Section>
  );
}
