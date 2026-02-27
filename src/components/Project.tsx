'use client';

import React, { useRef, useEffect, useState } from 'react';
import { PortableTextBlock } from 'next-sanity';
import { useAnimationControls, useInView } from 'framer-motion';
import clsx from 'clsx';

import { Section } from 'src/components/Section';
import Skills from 'src/components/Skills';
import ArrowRight from 'src/components/icons/ArrowRight';
import RichText from 'src/components/RichText';
import Video from 'src/components/Video';
import HorizontalScroll from 'src/components/HorizontalScroll';

export type VideoType = {
  asset: {
    assetId: string;
    playbackId: string;
  };
};

type VideosWithLabels = {
  title: string;
  video: VideoType;
};

export type ProjectType = {
  name: string;
  brand?: string;
  textColor: 'Black' | 'White';
  url: string;
  info: PortableTextBlock;
  keyTech: string[];
  videosWithLabels: VideosWithLabels[];
};

const Project = ({
  project,
  zIndex = 10,
}: {
  project: ProjectType;
  zIndex?: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  const ctrls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -300px 0px',
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isInView) {
      ctrls.start('visible');
    }
    if (!isInView) {
      ctrls.start('hidden');
    }
  }, [ctrls, isInView]);

  return (
    <Section
      ref={ref}
      bgColor={project.brand ? project.brand : '#ffffff'}
      textColor={project.textColor}
    >
      <HorizontalScroll
        zIndex={zIndex}
        topContent={
          isMobile ? (
            <div className="mb-4">
              <h2 className="font-bold text-3xl mb-4">{project.name}</h2>
            </div>
          ) : (
            <h2 className="font-bold text-3xl md:text-5xl mb-4">
              {project.name}
            </h2>
          )
        }
        bottomContent={
          <div className="mt-6 md:mb-8">
            <div className="md:flex md:gap-12">
              <div className="flex flex-col mb-4">
                <RichText
                  value={project.info}
                  className="mb-2 text-sm md:text-base"
                />
                <a
                  target="_blank"
                  href={project.url}
                  rel="noopener noreferrer"
                  className="inline-flex items-center w-auto group mb-4"
                >
                  <span className="inline-flex items-center">
                    Visit project
                    <span
                      className={clsx(
                        'block max-w-0 group-hover:max-w-full transition-all h-0.5 mt-px',
                        project.textColor === 'White'
                          ? 'bg-white'
                          : 'bg-eerieBlack',
                      )}
                    />
                  </span>
                  <ArrowRight
                    className={clsx(
                      'w-5 h-5 ml-1 group-hover:translate-x-0.5 transition',
                      project.textColor === 'White'
                        ? 'fill-white'
                        : 'fill-eerieBlack',
                    )}
                  />
                </a>
              </div>
              <Skills
                heading="Key tech"
                items={project?.keyTech}
                className="md:mb-6"
              />
            </div>
          </div>
        }
      >
        {project?.videosWithLabels?.map((item, index: number) => (
          <div
            key={item.video.asset.assetId}
            className="!w-auto h-full shrink-0 flex flex-col items-start first:ml-0 mx-2 lg:mx-4"
          >
            <p className="text-xs mb-2">
              {index + 1}. {item.title}
            </p>
            <Video video={item.video.asset} />
          </div>
        ))}
      </HorizontalScroll>
    </Section>
  );
};

export default Project;
