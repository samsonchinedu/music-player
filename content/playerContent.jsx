"use client";

import { createContext, useRef, useState } from "react";
import { songData } from "../data/songData";
import { Value } from "sass";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const [track, setTrack] = useState(songData[0])
    const audioPlayer = useRef();

    const playWithId = async (id) => {
        await setTrack(songData[id])
        await audioPlayer.current.play();
    }

    const contextValue = {
        audioPlayer,
        playWithId,
        track, setTrack,
    }

    return (
        <PlayerContext.Provider Value={contextValue}>
            {props.children}
        </ PlayerContext.Provider>
    )
}

export default PlayerContextProvider;