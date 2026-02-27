'use client';

import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const AnimatedTypingComponent = ({
  values,
  className,
}: {
  values: string[];
  className?: string;
}) => {
  const el = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: values,
      typeSpeed: 50,
      loop: true,
    });
    setLoaded(true);

    return () => {
      typed.destroy();
    };
  }, [values]);

  return (
    <div className={className}>
      {loaded ? <span ref={el} /> : <span ref={el}>{values[0]}</span>}
      {/* <span ref={el} /> */}
    </div>
  );
};

export default AnimatedTypingComponent;
