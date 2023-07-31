import { useRef, useContext } from "react";
import { BsFillPlayFill } from "react-icons/bs";
// import { ImFileMusic } from "react-icons/im";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";
// import { PlaylistContext } from "../../context/PlaylistContext";

// type Props = {};

const MusicCard = ({
    song,
    handleSetPlaylist,
    index,
}: {
    song: Song;
    handleSetPlaylist: (index: number) => void;
    index: number;
}): React.ReactNode => {
    const imgRef = useRef<HTMLImageElement>(null);

    const { setCurrentSong } = useContext(SongContext);
    // const { playlist, setPlaylist } = useContext(PlaylistContext);

    const handleClick = () => {
        setCurrentSong(song);
    };
    return (
        <div
            onClick={() => {
                handleClick();
                handleSetPlaylist(index);
            }}
            className="group min-w-[181px] max-w-[181px] flex items-center justify-center flex-col rounded-md snap-center bg-secDark p-1 md:p-2 lg:p-4 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]"
        >
            <div className="relative">
                <img
                    ref={imgRef}
                    loading="lazy"
                    src={song.coverUrl}
                    onLoad={() => imgRef.current?.classList.add("imageloaded")}
                    alt="card"
                    className="w-[150px] h-[150px] object-cover rounded-md opacity-0 transition-all duration-700"
                />
                <span
                    onClick={() => setCurrentSong(song)}
                    className="hidden lg:absolute w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-baseDark right-2 bottom-0 lg:flex lg:items-center lg:justify-center lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:bottom-2 transition-all ease-in-out duration-300 "
                >
                    <BsFillPlayFill size={30} className="translate-x-[1px]" />
                </span>
            </div>
            <div className="w-full capitalize pt-2 px-2 lg:px-0 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100">
                {song.name}
            </div>
            <p className="hidden w-full lg:block lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                {song.artists.map((artist) => (
                    <span key={artist.name}>{artist.name + ", "}</span>
                ))}
            </p>
        </div>
    );
};

export default MusicCard;
