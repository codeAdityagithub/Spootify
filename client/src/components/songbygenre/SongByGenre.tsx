import { useContext } from "react";

// import axios from "axios";

import { useInView } from "react-intersection-observer";

import { Song } from "../../types";

import MusicCard from "../card/MusicCard";
import CardNotLoaded from "../cardnotloaded/CardNotLoaded";
import { PlaylistContext } from "../../context/PlaylistContext";
// import { SongContext } from "../../context/SongContext";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SongByGenre = ({ genre }: { genre: string }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "100px",
    });
    const { setCurrentIndex, setPlaylist, setPlaylistId } =
        useContext(PlaylistContext);
    let songs: Song[];

    const { data, isError, isLoading } = useQuery({
        queryKey: ["songByGenre", genre],
        queryFn: async () => {
            const data = await axios
                .get(`http://localhost:8000/songs/${genre}`)
                .then((res) => res.data);
            // console.log(data);
            return data;
        },
        enabled: inView,
    });

    songs = data && data.results;
    const handleSetPlaylist = (index: number) => {
        songs && setPlaylist(songs);
        setPlaylistId(Number(genre));
        setCurrentIndex(index);
    };

    return (
        <div
            ref={ref}
            className="flex flex-row overflow-auto pl-2 gap-2 md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x"
        >
            {isError && <p>Failed to get Songs! Make sure you have internet</p>}
            {isLoading && !isError && <CardNotLoaded />}
            {songs &&
                songs.map((song, index) => (
                    <MusicCard
                        key={index}
                        song={song}
                        index={index}
                        handleSetPlaylist={handleSetPlaylist}
                    />
                ))}
        </div>
    );
};

export default SongByGenre;
