import { useRef, useContext, useEffect } from "react";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";
import { PlaylistContext } from "../../context/PlaylistContext";

const SearchCard = ({ song }: { song: Song }): React.ReactNode => {
    const imgRef = useRef<HTMLImageElement>(null);

    const { setCurrentSong } = useContext(SongContext);
    const { setPlaylist, setPlaylistId, setCurrentIndex } =
        useContext(PlaylistContext);
    return (
        <div
            tabIndex={0}
            onClick={() => {
                setCurrentSong(song);
                setPlaylist([]);
                setPlaylistId(-1);
                setCurrentIndex(0);
            }}
            className={`relative group w-full flex items-start gap-1 lg:gap-3 justify-center flex-row rounded-md snap-center p-1 md:p-2 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]`}
        >
            <div className="relative">
                <img
                    ref={imgRef}
                    loading="lazy"
                    src={song.coverUrl}
                    onLoad={() => imgRef.current?.classList.add("imageloaded")}
                    alt="card"
                    className="w-16 md:w-[5rem]  aspect-square object-cover rounded-md opacity-0 transition-all duration-700"
                />
            </div>
            <div className="w-[200px] md:w-[300px] mr-auto">
                {/* <span
                    onClick={() => setCurrentSong(song)}
                    className={`absolute w-fit h-12 rounded-full text-textDark-200 text-xs right-2 flex items-center justify-center bottom-1/2 translate-y-1/2 transition-all ease-in-out duration-300 `}
                >
                    Now Playing
                </span> */}
                <div className="capitalize pt-2 px-2 lg:px-0 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100">
                    {song.name}
                </div>
                <p className="hidden w-full lg:block lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                    {song.artists.map((artist) => (
                        <span key={artist.name}>{artist.name + ", "}</span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default SearchCard;
