'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const AnimatedTypingComponent = ({
  values,
  defaultValue = values[0],
  className,
}: {
  values: string[];
  defaultValue?: string;
  className?: string;
}) => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: values,
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [values]);

  return (
    <div className={className}>
      <span ref={el}>{defaultValue}</span>
    </div>
  );
};

export default AnimatedTypingComponent;
