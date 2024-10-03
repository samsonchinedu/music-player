"use client";

import AudioPlayer from "@/component/AudioPlayer/page";
import styles from "./page.module.scss";
import Track from "@/component/Track/page";
import { useRef, useState } from "react";
import { songData } from "../../data/songData";

export default function Home() {
  const [track, setTrack] = useState(songData[0])
  const [playStatus, setPlayStatus] = useState(false)
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();

  return (
    <div className={styles["page"]}>
      <Track
        audioPlayer={audioPlayer}
        setPlayStatus={setPlayStatus}
        setTrack={setTrack}
        track={track}
      />

      <AudioPlayer
        track={track}
        setTrack={setTrack}
        audioPlayer={audioPlayer}
        progressBar={progressBar}
        animationRef={animationRef}
        setPlayStatus={setPlayStatus}
      />
    </div>
  );
}
