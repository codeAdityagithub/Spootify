import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Song } from "../types";

import useSWR from "swr";
import PlaylistCard from "../components/card/PlaylistCard";
import SearchCard from "../components/card/SearchCard";

type Props = {};

const Search = (props: Props) => {
    let [searchParams] = useSearchParams();
    const genre = searchParams.get("genre");
    const mood = searchParams.get("mood");
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    let songs: Song[];
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/search?query=${searchParams.get(
            "query"
        )}&genre=&mood=`,
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnReconnect: false,
            revalidateOnFocus: false,
        }
    );

    songs = data && data.results;

    useEffect(() => {
        console.log(genre);
        console.log(songs?.filter((song) => song.genre === "Bass"));
    }, [genre, mood]);

    return (
        <div className="pb-[180px] md:pb-[120px]">
            {songs && songs.length === 0 && (
                <div className="text-center text-textDark-200 text-lg">
                    No songs found 😓
                </div>
            )}
            {songs &&
                songs.map((song, index) => (
                    <SearchCard key={index} song={song} />
                ))}
        </div>
    );
};

export default Search;
