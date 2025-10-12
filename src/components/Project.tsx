'use client';

import React, { useRef, useEffect } from 'react';
import { PortableTextBlock } from 'next-sanity';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useAnimationControls, motion, useInView } from 'framer-motion';
import clsx from 'clsx';
import 'swiper/css';

import { Section } from './Section';
import Skills from './Skills';
import ArrowRight from './icons/ArrowRight';
import RichText from './RichText';
import Video from './Video';
import HorizontalScroll from './HorizontalScroll';

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
  videos: VideoType[];
  videosWithLabels: VideosWithLabels[];
};

const Project = ({ project }: { project: ProjectType }) => {
  const ref = useRef<HTMLElement>(null);
  const ctrls = useAnimationControls();

  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
  });

  useEffect(() => {
    if (isInView) {
      ctrls.start('visible');
    }
    if (!isInView) {
      ctrls.start('hidden');
    }
  }, [ctrls, isInView]);

  const parentAnimation = {
    hidden: {},
    visible: {},
  };

  const childAnimation = {
    hidden: {
      opacity: 0,
      y: '50px',
    },
    visible: {
      opacity: 1,
      y: '0',
      transition: {
        duration: 1.8,
        ease: [0.075, 0.82, 0.165, 1],
      },
    },
  };

  return (
    <Section
      ref={ref}
      bgColor={project.brand ? project.brand : '#ffffff'}
      textColor={project.textColor}
      className="relative"
    >
      <motion.div
        initial="hidden"
        animate={ctrls}
        transition={{
          delayChildren: 0.25,
          staggerChildren: 0.35,
        }}
        variants={parentAnimation}
        className="lg:flex items-center gap-12"
      >
        <motion.div className="" variants={childAnimation}>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            {project.name}
          </h2>
          <div className="flex gap-12">
            <RichText value={project.info} className="mb-4" />
            <Skills
              heading="Key tech"
              items={project?.keyTech}
              className="mb-6"
            />
          </div>
          <div>
            <a
              target="_blank"
              href={project.url}
              rel="noopener noreferrer"
              className="inline-flex items-center w-auto group"
            >
              <span>
                View project
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
        </motion.div>
        {/* <div className="lg:w-2/3">
          <Swiper
            slidesPerView="auto"
            modules={[FreeMode]}
            observer
            observeParents
            freeMode={{ enabled: true, momentumBounce: true }}
            className="flex items-center !-ml-4 px-4 translate-x-4 lg:px-8 md:translate-x-8 lg:translate-x-8 cursor-drag"
          >
            {project?.videosWithLabels?.map((item, index: number) => (
              <SwiperSlide
                key={item.video.asset.assetId}
                className="!w-auto flex items-center first:ml-0 mx-2 lg:mx-4"
              >
                <p className="text-xs mb-2">
                  {index + 1}. {item.title}
                </p>
                <Video video={item.video.asset} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </motion.div>
      <HorizontalScroll>
        {project?.videosWithLabels?.map((item, index: number) => (
          <SwiperSlide
            key={item.video.asset.assetId}
            className="!w-auto flex items-center first:ml-0 mx-2 lg:mx-4"
          >
            <p className="text-xs mb-2">
              {index + 1}. {item.title}
            </p>
            <Video video={item.video.asset} />
          </SwiperSlide>
        ))}
      </HorizontalScroll>
    </Section>
  );
};

export default Project;
