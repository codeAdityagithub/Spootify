import { useContext, useEffect, useState } from "react";

import useSWR from "swr";

import { useParams } from "react-router-dom";

import { Song } from "../types";
import { Genre } from "../enums";
import { Color } from "../types";

import PlaylistCard from "../components/card/PlaylistCard";
import { SongContext } from "../context/SongContext";
import { PlaylistContext } from "../context/PlaylistContext";
// import getPlaylistData from "../hooks/usePlaylistData";

type Props = {};

const Playlist = ({}: Props) => {
    const { playlistId } = useParams();
    const { currentSong, setCurrentSong } = useContext(SongContext);
    const {
        currentIndex,
        setCurrentIndex,
        setPlaylist,
        setPlaylistId,
        playlist,
        playlistId: p_id,
    } = useContext(PlaylistContext);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const [songs, setSongs] = useState<Song[]>([]);
    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    let playlistName = "Latest";
    if (playlistId !== "0") {
        playlistName = Genre[Number(playlistId)];
    }
    // let songs: Song[] = [];
    const { data, error, isLoading, mutate } = useSWR(
        `http://localhost:8000/songs${
            playlistId === "0" ? `` : `/${playlistId}`
        }`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            revalidateOnFocus: false,
        }
    );

    // songs = data && data.results;

    useEffect(() => {
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
        fetch(
            `http://localhost:8000/songs${
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
            });
    };
    const updatePlaylist = () => {
        console.log(songs);
    };

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
                        className="button"
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
