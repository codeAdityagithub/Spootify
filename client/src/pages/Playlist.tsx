import { useContext, useEffect, useState } from "react";

import useSWR from "swr";

import { useParams } from "react-router-dom";

import { Song } from "../types";
import { Genre } from "../enums";
import { Color } from "../types";

import PlaylistCard from "../components/card/PlaylistCard";
import { SongContext } from "../context/SongContext";
import { PlaylistContext } from "../context/PlaylistContext";

type Props = {};

function Playlist({}: Props) {
    const { playlistId } = useParams();
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { currentSong, setCurrentSong } = useContext(SongContext);
    const {
        currentIndex,
        setCurrentIndex,
        playlist,
        setPlaylist,
        setPlaylistId,
    } = useContext(PlaylistContext);

    let playlistName = "Latest";
    if (playlistId !== "0") {
        playlistName = Genre[Number(playlistId)];
    }

    let songs: Song[];
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/songs${
            playlistId === "0" ? "" : `/${playlistId}`
        }`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            revalidateOnFocus: false,
        }
    );

    songs = data && data.results;
    useEffect(() => {
        songs && setPlaylist(songs);
        setPlaylistId(Number(playlistId));
    }, [songs]);

    let color: Color;
    color = currentSong !== "" ? currentSong.tags[1].color : null!;

    return (
        <div className="w-full pb-[180px] md:pb-[120px]">
            {/* top image */}
            <div
                className={`w-full h-[250px] flex items-end justify-start relative mb-2 overflow-hidden`}
                style={{
                    background: `linear-gradient(rgba(${color ? color.r : 0},${
                        color ? color.g : 0
                    },${color ? color.b : 0},1), rgba(0, 0, 0, 0.1)`,
                }}
            >
                {currentSong !== "" ? (
                    <img
                        src={currentSong.coverUrl}
                        alt="Song"
                        className="absolute top-0 left-1/2 -translate-x-1/2 "
                    />
                ) : null}
                <div className="w-full text-textDark-200 text-xl font-extrabold p-4 relative">
                    Playlist-{playlistName?.toLocaleUpperCase()}
                </div>
            </div>
            {/* playlist items */}
            <div className="flex flex-col items-center justify-center gap-2 overflow-auto md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                {songs &&
                    songs.map((song, index) => (
                        <PlaylistCard
                            key={index}
                            song={song}
                            index={index}
                            isCurrent={currentIndex === index}
                            setCurrentIndex={setCurrentIndex}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Playlist;
