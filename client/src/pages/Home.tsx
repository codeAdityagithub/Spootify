import useSWR from "swr";
import { useContext } from "react";
// import { useState } from "react";

import MusicCard from "../components/card/MusicCard";
import HorizontalCarousel from "../components/carousel/HorizontalCarousel";
// import NavItem from "../components/navitem/NavItem";
// import Player from "../components/player/Player";
import { Song } from "../types";

import { Genre } from "../enums";
// import SearchBar from "../components/searchbar/SearchBar";

import SongByGenre from "../components/songbygenre/SongByGenre";
import CardNotLoaded from "../components/cardnotloaded/CardNotLoaded";
import { PlaylistContext } from "../context/PlaylistContext";

const Home = (): React.ReactNode => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/songs",
        fetcher
    );
    const { setCurrentIndex, setPlaylist, setPlaylistId } =
        useContext(PlaylistContext);
    let latestSongs: Song[];

    latestSongs = data && data.results;

    // setting latest songs as playlist
    const handleSetLatest = (index: number) => {
        latestSongs && setPlaylist(latestSongs);
        setPlaylistId(0);
        setCurrentIndex(index);
    };

    const genres = Object.keys(Genre).filter((key) => !isNaN(Number(key)));
    return (
        <div className="w-full min-h-screen h-min pb-[150px] relative font-sans no-scrollbar scroll-smooth overflow-x-hidden flex flex-col justify-center items-start box-border">
            {/* page */}
            {error && (
                <HorizontalCarousel title="Latest Songs">
                    <p>Failed to get Songs! Make sure you have internet</p>
                </HorizontalCarousel>
            )}
            {isLoading && !error && (
                <HorizontalCarousel title="Latest Songs">
                    <CardNotLoaded />
                </HorizontalCarousel>
            )}
            {data && (
                <HorizontalCarousel title="Latest Songs" playlistId="0">
                    <div className="flex flex-row overflow-auto gap-2 md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                        {latestSongs.map((song, index) => (
                            <MusicCard
                                key={index}
                                song={song}
                                index={index}
                                handleSetPlaylist={handleSetLatest}
                            />
                        ))}
                    </div>
                </HorizontalCarousel>
            )}
            {genres.map((genre) => (
                <HorizontalCarousel
                    key={genre}
                    title={Genre[Number(genre)]}
                    playlistId={genre}
                >
                    <SongByGenre key={genre} genre={genre} />
                </HorizontalCarousel>
            ))}

            {/* bottom  */}
            {/* <div className="w-[calc(100%-8px)] left-[4px] fixed bottom-1 flex flex-col gap-1 text-textDark-100 z-20"> */}
            {/* <Player song={currentSong} /> */}
            {/* <NavItem /> */}
            {/* </div> */}
            {/* <div className="h-[200vh]">right</div> */}
        </div>
    );
};

export default Home;
