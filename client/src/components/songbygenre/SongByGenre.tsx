import { useContext } from "react";

// import axios from "axios";

import { useInView } from "react-intersection-observer";

import { Song } from "../../types";

import MusicCard from "../card/MusicCard";
import CardNotLoaded from "../cardnotloaded/CardNotLoaded";
import { PlaylistContext } from "../../context/PlaylistContext";
// import { SongContext } from "../../context/SongContext";

import { setCurrentIndex, setPlaylistState } from "../../redux/PlaylistSlice";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/Store";

const SongByGenre = ({ genre }: { genre: string }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "100px",
    });
    // const { setCurrentIndex, setPlaylist, setPlaylistId } =
    //     useContext(PlaylistContext);
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: songs,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["songByGenre", genre],
        queryFn: async () => {
            const data: Song[] = await axios
                .get(`${import.meta.env.VITE_API_URL}/songs/${genre}`)
                .then((res) => res.data.results);
            // console.log(data);
            return data;
        },
        enabled: inView,
    });

    const handleSetPlaylist = (index: number) => {
        // songs && setPlaylist(songs);
        // setPlaylistId(genre);
        // setCurrentIndex(index);
        if (songs) {
            dispatch(
                setPlaylistState({
                    queue: songs,
                    playlistLength: songs.length,
                    playlistId: genre,
                    currentIndex: index,
                })
            );
        }
    };

    return (
        <div
            ref={ref}
            className="flex flex-row overflow-auto p-2 gap-2 md:gap-3 lg:gap-4 hoz-scrollbar scroll-smooth snap-x"
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
