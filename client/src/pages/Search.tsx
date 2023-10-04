import { Song } from "../types";

import AddSongDialog from "../components/addsongtolist/AddSongDialog";
import SearchCard from "../components/card/SearchCard";

import { Genre } from "../enums";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface searchParams {
    query: string;
    genre: string;
    mood: string;
}

const Search = ({ query, genre, mood }: searchParams) => {

    const { data } = useQuery({
        queryKey: ["search", query],
        queryFn: async ({ signal }) => {
            const data: Song[] = await axios
                .get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/search?query=${query}&genre=&mood=`,
                    { signal }
                )
                .then((res) => res.data.results);
            // console.log(data);
            return data;
        },
        staleTime: 1000,
        enabled: Boolean(query.trim() !== "" && query.trim().length > 2),
    });

    const search = (data: Song[] | undefined): Song[] => {
        if (!data) return [];
        if (genre.trim() !== "" || mood.trim() !== "") {
            // console.log("hi")
            return data.filter(
                (song) =>
                    song.genre === Genre[Number(genre)] ||
                    song.tags.some((tag) => tag.mood === Number(mood))
            );
        }
        
        return data;
    };
    
    return (
        <div className="results mb-2 px-4 flex flex-col gap-2">
            <AddSongDialog />

            {data && data.length === 0 && (
                <div className="text-center text-textDark-200 text-lg">
                    No songs found 😓
                </div>
            )}
            {search(data).map((song, index) => (
                <SearchCard key={index} song={song} />
            ))}
        </div>
    );
};

export default Search;
