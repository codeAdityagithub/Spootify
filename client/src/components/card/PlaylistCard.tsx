import { useRef, useContext, useEffect } from "react";
// import { BsFillPlayFill } from "react-icons/bs";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";

// type Props = {};

const PlaylistCard = ({
    song,
    isCurrent,
    index,
    setCurrentIndex,
}: {
    song: Song;
    isCurrent: boolean;
    index: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactNode => {
    const imgRef = useRef<HTMLImageElement>(null);

    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        isCurrent && setCurrentSong(song);
    }, []);

    return (
        <div
            tabIndex={0}
            onClick={() => {
                setCurrentSong(song);
                setCurrentIndex(index);
            }}
            className={`${
                isCurrent ? " bg-[#282828]" : " bg-secDark"
            } relative group w-full flex items-start gap-1 lg:gap-3 justify-center flex-row rounded-md snap-center p-1 md:p-2 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]`}
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
                <span
                    onClick={() => setCurrentSong(song)}
                    className={`${
                        isCurrent ? "opacity-100" : "opacity-0"
                    } absolute w-fit h-12 rounded-full text-textDark-200 text-xs right-2 flex items-center justify-center bottom-1/2 translate-y-1/2 transition-all ease-in-out duration-300 `}
                >
                    {/* <BsFillPlayFill size={30} className="translate-x-[1px]" /> */}
                    Now Playing
                </span>
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

export default PlaylistCard;
