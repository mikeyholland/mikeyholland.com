import React from 'react';

import { SanityDocument } from 'next-sanity';

import Header from './Header';
import { Section } from './Section';
import Skills from './Skills';
import RichText from './RichText';
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

  const {
    name,
    about: aboutBlock,
    image,
    how,
    jobTitles,
    tech,
    techIntro,
  } = about;

  const imageUrl = urlForImage(image);

  return (
    <Section bgColor="#F1FAEE" textColor="Black">
      <Header
        name={name}
        image={image}
        imageUrl={imageUrl}
        jobTitles={jobTitles}
      />
      <div className="lg:flex gap-12 my-6">
        <div className="max-w-prose mb-8">
          <h3 className="font-bold text-xl mb-4">About</h3>
          <RichText value={aboutBlock} />
        </div>
        <div className="max-w-prose mb-8">
          <h3 className="font-bold text-xl mb-4">How I work</h3>
          <RichText value={how} />
        </div>
      </div>
      {/* <div>
        <div className="max-w-prose">
          <Skills
            heading="Skills / Key Technologies"
            items={tech}
            intro={techIntro}
          />
        </div>
      </div> */}
    </Section>
  );
}
