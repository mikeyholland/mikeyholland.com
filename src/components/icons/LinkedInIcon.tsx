import React from 'react';

export default function LinkedInIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0h30v30H0V0Zm6.285 12.358v11.613h3.611V12.358H6.285ZM8.09 6.563a2.096 2.096 0 1 0 .012 4.192 2.096 2.096 0 0 0-.012-4.192Zm4.07 5.807v11.613h3.612v-5.76c0-1.516.29-2.985 2.166-2.985s1.876 1.736 1.876 3.083v5.662h3.605v-6.388c0-3.13-.673-5.533-4.308-5.533a3.797 3.797 0 0 0-3.42 1.875h-.046V12.37H12.16Z"
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
