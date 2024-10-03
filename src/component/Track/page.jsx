"use client"

import React, { useContext, useRef, useState } from 'react'
import Image from 'next/image'
import styles from "./track.module.scss"
import { GoHeart } from "react-icons/go";
import { songData } from '../../../data/songData'
// import { PlayerContext } from '../../../content/playerContent';

const Track = ({audioPlayer, setPlayStatus, setTrack}) => {
   
    // const [playStatus, setPlayStatus] = useState(false)
    // const audioPlayer = useRef();

    const playWithId = async (id) => {
        await setTrack(songData[id])
        await audioPlayer.current.play();
        // setPlayStatus(true)
        console.log("play")
    }

    return (
        <div className={styles["track"]}>
            {songData.map((track, index) => (
                <div key={index} className={styles["track-container"]} onClick={() => playWithId(track.id)}>
                    <Image src={track.imageUrl} alt='cover image' width={60} height={60} />
                    <div className={styles["track-container-content"]}>
                        <div className={styles["track-container-content-text"]}>
                            <h5>{track.title}</h5>
                            <p>{track.singer}</p>
                        </div>
                        <GoHeart size={24} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Track