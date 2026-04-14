'use client';

import React, { useContext } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import clsx from 'clsx';

import { TextContext } from 'src/app/context/textContext';
import MuxPlayerStyles from './video.module.css';

interface videoType {
  playbackId: string;
  assetId: string;
}

export default function Video({ video }: { video: videoType }) {
  const { textColor } = useContext(TextContext);

  return (
    <div
      className={clsx(
        'p-2 lg:p-4 rounded h-full',
        textColor === 'Black' ? 'bg-eerieBlack' : 'bg-white',
      )}
    >
      <div className="relative bg-eerieBlack md:min-w-24 h-36 xs:h-44 md:h-64 lg:h-72 xl:h-88 flex items-center">
        <MuxPlayer
          playbackId={video?.playbackId}
          loop
          muted
          autoPlay
          streamType="live"
          className={clsx(
            MuxPlayerStyles.muxPlayer,
            'w-full h-36 xs:h-44 md:h-64 lg:h-72 xl:h-88',
          )}
        />
      </div>
    </div>
  );
}
