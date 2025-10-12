import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import clsx from 'clsx';

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const targetRef = useRef(null);
  const scrollPaneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  console.log({ scrollPaneRef });

  const x = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);

  const scrollPaneRect = scrollPaneRef?.current?.getBoundingClientRect();

  console.log({ scrollPaneRect });

  return (
    <section
      ref={targetRef}
      className={clsx(
        scrollPaneRect && `h-[${scrollPaneRect.width}px]`,
        `relative bg-neutral-900`,
      )}
    >
      <div ref={scrollPaneRef} className="sticky flex items-center">
        <motion.div style={{ x }} className="flex gap-4">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
