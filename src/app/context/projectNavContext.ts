'use client';

import { createContext, Dispatch, SetStateAction } from 'react';

export type ProjectNavEntry = {
  index: number;
  color: string;
};

export interface ProjectNavContextType {
  projects: ProjectNavEntry[];
  setProjects: Dispatch<SetStateAction<ProjectNavEntry[]>>;
}

export const ProjectNavContext = createContext<ProjectNavContextType>({
  projects: [],
  setProjects: () => {},
});
