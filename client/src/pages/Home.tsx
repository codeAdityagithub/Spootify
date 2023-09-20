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

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { setPlaylistState } from "../redux/PlaylistSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/Store";
import { setCurrentSong } from "../redux/SongSlice";

import AddSongDialog from "../components/addsongtolist/AddSongDialog";

const Home = (): React.ReactNode => {
    const {
        data: latestSongs,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["latestSongs", "0"],
        queryFn: async () => {
            const data: Song[] = await axios
                .get(`${import.meta.env.VITE_API_URL}/songs`)
                .then((res) => res.data.results);
            // console.log(data);
            return data;
        },
    });

    // const handleScroll = (event:React.WheelEvent<HTMLDivElement>) => {
    //     const container = event.target;
    //     const scrollAmount = event.deltaY;
    //     container.scrollTo({
    //       top: 0,
    //       left: container.scrollLeft + scrollAmount,
    //       behavior: 'smooth'
    //     });
    //   };
    const dispatch = useDispatch<AppDispatch>();

    // setting latest songs as playlist
    const handleSetLatest = (index: number) => {
        // latestSongs && setPlaylist(latestSongs);
        // setPlaylistId("0");
        // setCurrentIndex(index);

        if (latestSongs) {
            dispatch(
                setPlaylistState({
                    queue: latestSongs,
                    playlistLength: latestSongs.length,
                    playlistId: "0",
                    currentIndex: index,
                })
            );
        }
    };

    const genres = Object.keys(Genre).filter((key) => !isNaN(Number(key)));
    return (
        <div
            id="homeMain"
            className="w-full h-auto overflow-y-auto pt-14 md:pt-4 relative font-sans no-scrollbar scroll-smooth flex flex-col gap-2 justify-center items-start box-border"
        >
            {/* page */}
            <AddSongDialog />
            {isError && (
                <HorizontalCarousel title="Latest Songs">
                    <p>Failed to get Songs! Make sure you have internet</p>
                </HorizontalCarousel>
            )}
            {isLoading && !isError && (
                <HorizontalCarousel title="Latest Songs">
                    <CardNotLoaded />
                </HorizontalCarousel>
            )}
            {latestSongs && (
                <HorizontalCarousel title="Latest Songs" playlistId="0">
                    <div className="flex flex-row overflow-auto p-2 gap-2 md:gap-3 lg:gap-4 hoz-scrollbar scroll-smooth snap-x">
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
