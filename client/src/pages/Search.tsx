import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import { Song } from "../types";

import SearchCard from "../components/card/SearchCard";
import AddSongDialog from "../components/addsongtolist/AddSongDialog";

import { Genre } from "../enums";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface searchParams {
    query: string;
    genre: string;
    mood: string;
}

const Search = ({ query, genre, mood }: searchParams) => {
    // let [searchParams] = useSearchParams();
    // const genre = searchParams.get("genre");
    // const mood = searchParams.get("mood");

    let songs: Song[];

    const { data } = useQuery({
        queryKey: ["search", query],
        queryFn: async ({ signal }) => {
            const data = await axios
                .get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/search?query=${query}&genre=&mood=`,
                    { signal }
                )
                .then((res) => res.data);
            // console.log(data);
            return data;
        },
        staleTime: 1000,
        enabled: Boolean(query.trim() !== "" && query.trim().length > 2),
    });

    songs = data && data.results;

    useEffect(() => {
        if (!songs) return;
        // console.log(Genre[Number(genre)]);
        songs?.filter((song) => {
            if (song.genre.replace(" ", "") === Genre[Number(genre)])
                return song;
        });
    }, [genre, mood]);

    return (
        <div className="results mb-2 px-4 flex flex-col gap-2">
            <AddSongDialog />

            {songs && songs.length === 0 && (
                <div className="text-center text-textDark-200 text-lg">
                    No songs found 😓
                </div>
            )}
            {songs && genre === ""
                ? songs.map((song, index) => (
                      <SearchCard key={index} song={song} />
                  ))
                : songs
                      ?.filter((song) => {
                          if (
                              song.genre.replace(" ", "") ===
                              Genre[Number(genre)]
                          )
                              return song;
                      })
                      .map((song, index) => (
                          <SearchCard key={index} song={song} />
                      ))}
        </div>
    );
};

export default Search;
