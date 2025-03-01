"use client";

import dynamic from "next/dynamic";
import { MovieVideoProps } from "./MovieVideo.type";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export  function MovieVideo(props: MovieVideoProps) {
    const { currentMovie } = props;

    return (
      <ReactPlayer
        url={currentMovie}
        loop={true}
        width="100%"
        height="100%"
        playing={true}
        muted={false}
        controls={true}
      />
    );
}
