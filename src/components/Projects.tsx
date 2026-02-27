import React from 'react';
import { SanityDocument } from 'next-sanity';
import 'swiper/css';

import { sanityFetch } from '../../sanity/client';
import Project, { ProjectType } from './Project';

const PROJECTS_QUERY = `
  *[_type == "project"]| order(orderRank){
    ...,
    'videosWithLabels': videosWithLabels[] {
      _type == 'reference' => @-> {
        ...,
        video {
          asset-> {
            playbackId,
            assetId,
            data {
              ...,
            }
          }
        }
      }
    }
  }
`;

export default async function Projects() {
  const projects = await sanityFetch<SanityDocument>({
    query: PROJECTS_QUERY,
  });

  return projects.map((project: ProjectType, index: number) => (
    <Project key={project.name} project={project} zIndex={1 + index} />
  ));
}
