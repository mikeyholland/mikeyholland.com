'use client';

import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import { ProjectNavContext } from 'src/app/context/projectNavContext';

export default function ProjectNav() {
  const { projects } = useContext(ProjectNavContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sorted = [...projects].sort((a, b) => a.index - b.index);

  if (!mounted || sorted.length === 0) return null;

  const handleClick = (index: number) => {
    const section = document.getElementById(`project-${index}`);
    if (!section) return;

    const sticky = section.querySelector<HTMLElement>('.sticky');
    const stickyTopValue = sticky ? parseInt(sticky.style.top, 10) || 0 : 0;
    const paddingTop = parseFloat(getComputedStyle(section).paddingTop);
    const sectionAbsTop = window.scrollY + section.getBoundingClientRect().top;

    window.scrollTo({
      top: sectionAbsTop + paddingTop - stickyTopValue,
      behavior: 'smooth',
    });
  };

  return createPortal(
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      aria-label="Project navigation"
    >
      {sorted.map((project) => (
        <motion.button
          key={project.index}
          onClick={() => handleClick(project.index)}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-5 h-5 block cursor-pointer border"
          style={{ backgroundColor: project.color }}
          aria-label={`Jump to project ${project.index + 1}`}
        />
      ))}
    </nav>,
    document.body,
  );
}
