'use client';

import React, { useRef, useEffect, useState, useContext } from 'react';
import { PortableTextBlock } from 'next-sanity';
import { useAnimationControls, useInView } from 'framer-motion';
import clsx from 'clsx';

import { Section } from 'src/components/Section';
import { ProjectNavContext } from 'src/app/context/projectNavContext';
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
  index = 0,
}: {
  project: ProjectType;
  zIndex?: number;
  index?: number;
}) => {
  const ref = useRef<HTMLElement>(null);
  const ctrls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);
  const { setProjects } = useContext(ProjectNavContext);
  const sectionId = `project-${index}`;

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -300px 0px',
  });

  useEffect(() => {
    setProjects((prev) => {
      if (prev.some((p) => p.index === index)) return prev;
      return [...prev, { index, color: project.brand ?? '#ffffff' }];
    });
  }, [index, project.brand, setProjects]);

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

  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <Section
      ref={ref}
      id={sectionId}
      bgColor={project.brand ? project.brand : '#ffffff'}
      textColor={project.textColor}
    >
      <HorizontalScroll
        zIndex={zIndex}
        topContent={
          isMobile ? (
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold opacity-30 tabular-nums">
                  {indexLabel}
                </span>
                <h2 className="font-bold text-3xl">{project.name}</h2>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-base font-bold opacity-30 tabular-nums -mb-1">
                  {indexLabel}
                </span>
                <h2 className="font-bold text-3xl md:text-5xl">
                  {project.name}
                </h2>
              </div>
            </div>
          )
        }
        bottomContent={
          <div className="mt-6 md:mb-8">
            <div className="md:flex md:gap-12">
              <div className="flex flex-col mb-4 max-w-4xl">
                <RichText
                  value={project.info}
                  className="mb-2 text-sm md:text-base lg:text-lg 2xl:text-xl"
                />
                {project.url && (
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
                            : 'bg-persianGreen',
                        )}
                      />
                    </span>
                    <ArrowRight
                      className={clsx(
                        'w-5 h-5 ml-1 group-hover:translate-x-0.5 transition',
                        project.textColor === 'White'
                          ? 'fill-white'
                          : 'fill-eerieBlack group-hover:fill-persianGreen',
                      )}
                    />
                  </a>
                )}
              </div>
              <Skills
                heading="Key tech"
                items={project?.keyTech}
                className="lg:-mt-12"
              />
            </div>
          </div>
        }
      >
        {project?.videosWithLabels?.map((item, videoIndex: number) => (
          <div
            key={item.video.asset.assetId}
            className="!w-auto h-full shrink-0 flex flex-col items-start first:ml-0 mx-2 lg:mx-4"
          >
            <p className="text-xs mb-2 font-bold opacity-50">
              {String(videoIndex + 1).padStart(2, '0')} — {item.title}
            </p>
            <Video video={item.video.asset} />
          </div>
        ))}
      </HorizontalScroll>
    </Section>
  );
};

export default Project;
