import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Song } from "../types";
import { Genre } from "../enums";

import PlaylistCard from "../components/card/PlaylistCard";
import { SongContext } from "../context/SongContext";
// import getPlaylistData from "../hooks/usePlaylistData";

import { setPlaylistState, updatePlaylistLength } from "../redux/PlaylistSlice";

import AddSongDialog from "../components/addsongtolist/AddSongDialog";

type Props = {};

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/Store";
import CardDialog from "../components/card/CardDialog";

const Playlist = ({}: Props) => {
    const { playlistId } = useParams();
    const { currentSong } = useContext(SongContext);

    const dispatch = useDispatch<AppDispatch>();

    let playlistName = "Latest";
    if (playlistId !== "0") {
        playlistName = Genre[Number(playlistId)];
    }

    const {
        data,
        error,
        status,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: [
            playlistId !== "0" ? "genrePlaylist" : "latestSongsPlaylist",
            playlistId,
        ],
        getNextPageParam: (lastPage: any) => lastPage.nextPage,
        queryFn: async ({ pageParam = 0 }) => {
            const data = await axios
                .get(
                    `${import.meta.env.VITE_API_URL}/songs${
                        playlistId === "0" ? `` : `/${playlistId}`
                    }?page=${pageParam}`
                )
                .then((res) => res.data);
            // console.log(data);
            return data;
        },
    });

    // songs = data && data.results;

    useEffect(() => {
        if (data) {
            playlistId != null &&
                dispatch(
                    setPlaylistState({
                        queue: data.pages?.flatMap(
                            (page) => page.results
                        ),
                        playlistLength: data.pages?.flatMap(
                            (page) => page.results
                        ).length,
                        playlistId: playlistId,
                        currentIndex: 0,
                    })
                );
            // console.log(
            //     playlistId,
            //     data.pages?.flatMap((page) => page.results)
            // );
        }
    }, [data]);

    return (
        <div className="w-full pb-[20px] ">
            {/* top image */}
            <AddSongDialog />
            <div
                className={`w-full h-[500px] md:h-[350px] flex items-end justify-start relative mb-2 overflow-hidden`}
                // style={{
                //     background: `linear-gradient(rgba(${color ? color.r : 0},${
                //         color ? color.g : 0
                //     },${color ? color.b : 0},1), rgba(0, 0, 0, 0.1)`,
                // }}
            >
                {currentSong ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="relative self-stretch w-full top-1/2 -translate-y-1/2 blur-sm brightness-50 select-none"
                        // className="absolute top-0 left-1/2 -translate-x-1/2 "
                    />
                ) : null}
                {currentSong ? (
                    <div className="absolute flex flex-col md:flex-row top-2 left-1/2 -translate-x-1/2 select-none backdrop-blur-md">
                        <img
                            src={currentSong.coverUrl}
                            alt={currentSong.name}
                            className="min-w-[300px] min-h-[300px] select-none shadow-lg shadow-gray-800"
                        />
                        <div className="flex flex-col items-start justify-start gap-4 md:ml-3 md:pt-4 md:w-32 lg:w-48">
                            <div className="w-full text-left text-textDark-200 text-2xl font-bold relative">
                                {currentSong.name}
                            </div>
                            <p className="w-full block text-justify lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                                {currentSong.artists.map((artist) => (
                                    <span key={artist.name}>
                                        {artist.name + ", "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ) : null}
                {currentSong && (
                    <>
                        <CardDialog
                            song={currentSong}
                            pos="-left-44 md:-left-52"
                        />
                    </>
                )}
            </div>
            {/* playlist items */}
            <div className="min-h-[calc(100vh-400px)] flex flex-col items-center justify-center gap-2 overflow-auto md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                {/* {songs && (playlist.length == 0 || p_id !== playlistId)
                    ? songs.map((song, index) => (
                          <PlaylistCard
                              key={index}
                              song={song}
                              index={index}
                              isCurrent={currentIndex === index}
                          />
                      ))
                    : playlist.map((song, index) => (
                          <PlaylistCard
                              key={index}
                              song={song}
                              index={index}
                              isCurrent={currentIndex === index}
                          />
                      ))} */}
                {data &&
                    data.pages
                        ?.flatMap((page) => page.results)
                        .map((song: Song, index) => (
                            <PlaylistCard
                                key={index}
                                song={song}
                                index={index}
                            />
                        ))}
                {hasNextPage ? (
                    <button
                        disabled={isFetchingNextPage}
                        className="button disabled:text-textDark-500"
                        onClick={() => {
                            // setPage((prev) => prev + 1);
                            // addMore();
                            // updatePlaylist();
                            fetchNextPage();
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
