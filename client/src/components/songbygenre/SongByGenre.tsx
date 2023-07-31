import { useContext } from "react";

// import axios from "axios";
import useSWR from "swr";

import { useInView } from "react-intersection-observer";

import { Song } from "../../types";

import MusicCard from "../card/MusicCard";
import CardNotLoaded from "../cardnotloaded/CardNotLoaded";
import { PlaylistContext } from "../../context/PlaylistContext";
// import { SongContext } from "../../context/SongContext";

const SongByGenre = ({ genre }: { genre: string }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "100px",
    });
    const { setCurrentIndex, setPlaylist, setPlaylistId } =
        useContext(PlaylistContext);
    let songs: Song[];

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(
        inView ? `http://localhost:8000/songs/${genre}` : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            revalidateOnFocus: false,
        }
    );

    songs = data && data.results;
    const handleSetPlaylist = (index: number) => {
        songs && setPlaylist(songs);
        setPlaylistId(Number(genre));
        setCurrentIndex(index);
    };

    return (
        <div
            ref={ref}
            className="flex flex-row overflow-auto gap-2 md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x"
        >
            {error && <p>Failed to get Songs! Make sure you have internet</p>}
            {!songs && !error && <CardNotLoaded />}
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
