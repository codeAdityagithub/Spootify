import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Song } from "../types";
import { Genre } from "../enums";

import PlaylistCard from "../components/card/PlaylistCard";
import { SongContext } from "../context/SongContext";
import { PlaylistContext } from "../context/PlaylistContext";
// import getPlaylistData from "../hooks/usePlaylistData";

type Props = {};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Playlist = ({}: Props) => {
    const { playlistId } = useParams();
    const { currentSong } = useContext(SongContext);
    const {
        currentIndex,
        setCurrentIndex,
        setPlaylist,
        setPlaylistId,
        playlist,
        playlistId: p_id,
    } = useContext(PlaylistContext);

    const [songs, setSongs] = useState<Song[]>([]);
    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    let playlistName = "Latest";
    if (playlistId !== "0") {
        playlistName = Genre[Number(playlistId)];
    }

    const { data } = useQuery({
        queryKey: [
            playlistId !== "0" ? "songByGenre" : "latestSongs",
            playlistId,
        ],
        queryFn: async () => {
            const data = await axios
                .get(
                    `${import.meta.env.VITE_API_URL}/songs${
                        playlistId === "0" ? `` : `/${playlistId}`
                    }`
                )
                .then((res) => res.data);
            // console.log(data);
            return data;
        },
    });

    // songs = data && data.results;

    useEffect(() => {
        data &&
            localStorage.setItem("playlist", JSON.stringify(data.results[0]));
        data &&
            (playlist.length === 0 || p_id !== Number(playlistId)) &&
            setPlaylist(data.results);
        // console.log(songs);
        // if (songs && playlist && playlist.length > songs.length) {
        //     addMore();
        //     setPage((prev) => prev + 1);
        // }
        data && setSongs(data.results);
        setPlaylistId(Number(playlistId));
    }, [data]);

    const addMore = async () => {
        if (!hasMore) return;
        setLoadingMore(true);
        fetch(
            `${import.meta.env.VITE_API_URL}/songs${
                playlistId !== "0" ? `/${playlistId}` : ""
            }?page=${page}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.results.length <= 0) {
                        setHasMore(false);
                    } else {
                        // console.log(data.results);

                        setPlaylist([...songs, ...data.results]);
                        setSongs((prev) => [...prev, ...data.results]);
                    }
                }
                setLoadingMore(false);
            });
    };

    // let color: Color;
    // color = currentSong !== "" ? currentSong.tags[1].color : null!;

    return (
        <div className="w-full pb-[20px]">
            {/* top image */}
            <div
                className={`w-full h-[350px] flex items-end justify-start relative mb-2 overflow-hidden`}
                // style={{
                //     background: `linear-gradient(rgba(${color ? color.r : 0},${
                //         color ? color.g : 0
                //     },${color ? color.b : 0},1), rgba(0, 0, 0, 0.1)`,
                // }}
            >
                {currentSong !== "" ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="absolute self-stretch w-full top-1/2 -translate-y-1/2 blur-sm select-none"
                        // className="absolute top-0 left-1/2 -translate-x-1/2 "
                    />
                ) : null}
                {currentSong !== "" ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="absolute top-2 left-1/2 -translate-x-1/2 select-none"
                    />
                ) : null}
                <div className="w-full text-textDark-200 text-xl font-extrabold p-4 relative">
                    Playlist-{playlistName?.toLocaleUpperCase()}
                </div>
            </div>
            {/* playlist items */}
            <div className="flex flex-col items-center justify-center gap-2 overflow-auto md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                {songs && (playlist.length == 0 || p_id !== Number(playlistId))
                    ? songs.map((song, index) => (
                          <PlaylistCard
                              key={index}
                              song={song}
                              index={index}
                              isCurrent={currentIndex === index}
                              setCurrentIndex={setCurrentIndex}
                          />
                      ))
                    : playlist.map((song, index) => (
                          <PlaylistCard
                              key={index}
                              song={song}
                              index={index}
                              isCurrent={currentIndex === index}
                              setCurrentIndex={setCurrentIndex}
                          />
                      ))}
                {hasMore ? (
                    <button
                        disabled={loadingMore}
                        className="button disabled:text-textDark-500"
                        onClick={() => {
                            setPage((prev) => prev + 1);
                            addMore();
                            // updatePlaylist();
                        }}
                    >
                        Load More
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Playlist;
