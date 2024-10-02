"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from "./audioplayer.module.scss"
import { GoHeart } from "react-icons/go";
import { PiShuffleThin } from "react-icons/pi";
import { LuPlaySquare } from "react-icons/lu";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

const AudioPlayer = () => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(1)


    // reference
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation
    const audio = "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const hours = Math.floor(secs / 60);
        const returnedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedHours}:${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const backTen = () => {
        progressBar.current.value = Number(progressBar.current.value - 5);
        changeRange();
    }

    const forwardTen = () => {
        progressBar.current.value = Number(progressBar.current.value + 5);
        changeRange();
    }

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        audioPlayer.current.setVolume(newVolume);
        setMuted(newVolume === 0);
    }



    const handleMuted = () => {
        setMuted(!muted);
        audioPlayer.current.setVolume(muted ? volume : 0)
    }




    return (
        <div className={styles["audio"]}>
            <audio ref={audioPlayer} id='volume' src={audio} preload='metadata' volume></audio>
            <div className={styles["audio-profile"]}>
                <Image
                    width={60}
                    height={60}
                    alt="Cover Image"
                    src={"https://images.unsplash.com/photo-1592339420310-e20dfbad29ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D"}
                />
                <div className={styles["audio-profile-names"]}>
                    <div>
                        <h5>Amazing</h5>
                        <p>Nathaniel Bassey</p>
                    </div>
                    <GoHeart size={24} />
                </div>
            </div>

            <div className={styles["audio-player"]}>
                <div className={styles["audio-player-top"]}>
                    <button>
                        <PiShuffleThin size={24} />
                    </button>
                    <button onClick={backTen}>
                        <FaBackward size={24} />
                    </button>
                    <button onClick={togglePlayPause} className={styles["audio-player-top-play"]}>
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className={styles["audio-player-top-play-play"]} />}
                    </button>
                    <button onClick={forwardTen}>
                        <FaForward size={24} />
                    </button>
                    <button>
                        <TbRepeat size={24} />
                    </button>
                </div>
                <div className={styles["audio-player-bottom"]}>
                    <span>{calculateTime(currentTime)}</span>
                    <input type="range" defaultValue={0} ref={progressBar} onChange={changeRange} />
                    <span>{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
                </div>
            </div>

            <div className={styles["audio-extra"]}>
                <div className={styles["audio-extra-volume"]}>
                    <div onClick={handleMuted}>
                        {muted ? <IoMdVolumeOff size={24} /> : <IoMdVolumeHigh size={24} />}
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step="0.01"
                        id='volume'
                        name='volume'
                        value={muted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    />
                </div>
                <div><LuPlaySquare size={24} /></div>
                <div><PiDotsThreeCircleLight size={24} /></div>
            </div>
        </div>
    )
}

export default AudioPlayer