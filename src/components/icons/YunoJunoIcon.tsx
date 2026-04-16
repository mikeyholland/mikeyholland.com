import React from 'react';

export default function YunoJunoIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fill="#F5F5F5" d="M0 0h30v30H0z" />
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0h30v30H0V0Zm24.136 11.473-1.694-2.946a.807.807 0 0 0-1.093-.294l-4.227 2.427V5.8a.8.8 0 0 0-.8-.8h-3.4a.8.8 0 0 0-.8.8v4.86l-4.22-2.427a.8.8 0 0 0-1.093.294l-1.7 2.946a.8.8 0 0 0 .287 1.094L9.622 15l-4.22 2.44a.8.8 0 0 0-.293 1.093l1.7 2.947a.786.786 0 0 0 1.087.287l4.226-2.427v4.873a.8.8 0 0 0 .8.787h3.4a.8.8 0 0 0 .8-.8v-7.753l6.72-3.88a.8.8 0 0 0 .294-1.094Zm-.316 6.16L21.007 16 18.5 17.447v2.886l2.82 1.627a.793.793 0 0 0 1.093-.287l1.7-2.946a.8.8 0 0 0-.286-1.094h-.007Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h30v30H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
