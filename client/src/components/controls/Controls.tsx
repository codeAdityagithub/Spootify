import React, { useState, useContext } from "react";
import { useRef } from "react";

import { PlaylistContext } from "../../context/PlaylistContext";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";

import Forward5Icon from "@mui/icons-material/Forward5";
import Replay5Icon from "@mui/icons-material/Replay5";

import { SongContext } from "../../context/SongContext";

const speedVal = ["Normal", "1.25x", "1.5x", "1.75x", "2x"];

const Controls = ({ audioSrc }: { audioSrc: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState<number>(0);

    const { currentIndex, setCurrentIndex, playlist, playlistId } =
        useContext(PlaylistContext);
    const { setCurrentSong } = useContext(SongContext);

    const handleEnd = () => {
        if (playlist.length === 0 || playlist.length - 1 === currentIndex) {
            return;
        }
        setCurrentIndex((prev) => prev + 1);
        setCurrentSong(playlist[currentIndex + 1]);
    };
    const handlePrev = () => {
        if (playlist.length === 0 || currentIndex === 0) {
            return;
        }
        setCurrentIndex((prev) => prev - 1);
        setCurrentSong(playlist[currentIndex - 1]);
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(event.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const updateDuration = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsPlaying(true);
        }
    };
    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const playPause = async () => {
        if (audioRef.current?.paused) {
            await audioRef.current?.play();
            setIsPlaying(true);
        } else {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    };

    const setSpeed = (
        e:
            | React.SyntheticEvent<HTMLAudioElement, Event>
            | React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.type == "click") {
            setCurrentSpeed((prev) => (prev + 1) % speedVal.length);
        }
        if (audioRef.current) {
            audioRef.current.playbackRate =
                1 +
                0.25 *
                    ((e.type == "click" ? currentSpeed + 1 : currentSpeed) %
                        speedVal.length);
        }
    };

    const skipForward = () => {
        if (audioRef.current) {
            const time = currentTime + 5;
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const skipBack = () => {
        if (audioRef.current) {
            const time = currentTime - 5;
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="md:ml-8 h-16 flex flex-col justify-around w-full">
            {/* main audio */}
            <audio
                ref={audioRef}
                src={`${
                    import.meta.env.VITE_STREAM_URL
                }/stream?url=${audioSrc}`}
                // controls
                onTimeUpdate={updateTime}
                onLoadedMetadata={updateDuration}
                onLoadStart={(e) => {
                    setSpeed(e);
                }}
                hidden
                autoPlay={true}
                onEnded={handleEnd}
                onError={handleEnd}
            ></audio>

            {/* controls */}
            <div className="flex flex-col sm:flex-row-reverse items-center justify-center h-16">
                <div className="flex flex-row items-center justify-center gap-4 flex-1">
                    <div
                        className={`controls-icon ${
                            playlistId === "" ? "text-textDark-400" : ""
                        }`}
                        onClick={handlePrev}
                    >
                        <SkipPreviousRoundedIcon fontSize="large" />
                    </div>
                    <div className={`controls-icon`} onClick={skipBack}>
                        <Replay5Icon fontSize="medium" />
                    </div>
                    <div className="controls-icon" onClick={playPause}>
                        {isPlaying ? (
                            <PauseRoundedIcon fontSize="large" />
                        ) : (
                            <PlayArrowRoundedIcon fontSize="large" />
                        )}
                    </div>
                    <div className={`controls-icon`} onClick={skipForward}>
                        <Forward5Icon fontSize="medium" />
                    </div>
                    <div
                        className={`controls-icon ${
                            playlistId === "" ? "text-textDark-400" : ""
                        }`}
                        onClick={handleEnd}
                    >
                        <SkipNextRoundedIcon fontSize="large" />
                    </div>
                    <div
                        className={`controls-speed w-12 text-xs rounded-lg text-center py-2`}
                        onClick={(e) => setSpeed(e)}
                    >
                        <span>{speedVal[currentSpeed]}</span>
                    </div>
                </div>

                {/* seeker */}
                <div className="flex items-center justify-center p-1 w-full h-10  sm:flex-1">
                    <span className="text-xs text-textDark-200 p-1">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        step="1"
                        value={currentTime}
                        onChange={(e) => handleSeek(e)}
                        className="seeker-range w-full max-w-[500px]"
                    />
                    <span className="text-xs text-textDark-200 p-1">
                        {formatTime(duration)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Controls;
