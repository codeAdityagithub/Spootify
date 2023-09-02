import { useRef, useContext, useState, useEffect } from "react";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";
import { useOutletContext } from "react-router-dom";
import { PlaylistContext } from "../../context/PlaylistContext";
import CardDialog from "./CardDialog";
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

    const [openOptions, setOpenOptions] = useState(false);

    const { setCurrentSong } = useContext(SongContext);
    const { setSelectedSong } = useContext(PlaylistContext);
    const dialogRef = useOutletContext<React.RefObject<HTMLDialogElement>>();
    const popoverRef = useRef<HTMLDialogElement>(null);

    const handleClick = () => {
        setCurrentSong(song);
    };
    const clickOutside = () => {
        setOpenOptions(false);
        popoverRef.current?.close();
    };

    // useEffect(() => {
    //     document.addEventListener("click", clickOutside);
    //     return document.removeEventListener("click", clickOutside);
    // }, []);

    return (
        <div
            onMouseLeave={clickOutside}
            className="relative min-w-[181px] max-w-[181px] flex items-center justify-start flex-col rounded-md snap-center bg-secDark p-1 pb-10 md:p-2 md:pb-10 lg:p-4 lg:pb-6 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]"
        >
            <div
                className="relative group cursor-pointer"
                onClick={() => {
                    handleClick();
                    handleSetPlaylist(index);
                }}
            >
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
                    <PlayArrowRoundedIcon fontSize="large" />
                </span>
            </div>

            <div
                onClick={() => {
                    handleClick();
                    handleSetPlaylist(index);
                }}
                className="w-full cursor-pointer capitalize pt-2 px-2 lg:px-0 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100"
            >
                {song.name}
            </div>
            <p className="hidden w-full lg:block lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                {song.artists.map((artist) => (
                    <span key={artist.name}>{artist.name + ", "}</span>
                ))}
            </p>
            <button
                className="absolute rounded-md bottom-2 right-2 z-10 hover:bg-gray-700"
                onClick={() => {
                    if (!openOptions) popoverRef.current?.show();
                    else popoverRef.current?.close();

                    setOpenOptions((prev) => !prev);
                }}
            >
                <MoreVertIcon />
            </button>
            <div className="absolute bottom-2 right-2 hover:bg-gray-700 rounded-lg group">
                {/* <button
                    onClick={() => {
                        if (!openOptions) popoverRef.current?.show();
                        else popoverRef.current?.close();

                        setOpenOptions((prev) => !prev);
                    }}
                >
                    <MoreVertIcon />
                </button> */}
                {/* <dialog
                    // onMouseLeave={() => setOpenOptions(false)}
                    id="dropdown-menu"
                    ref={popoverRef}
                    className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700 absolute bottom-0 left-full`}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        <li
                            onClick={() => {
                                dialogRef.current?.showModal();
                                setSelectedSong(song);
                            }}
                        >
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Add to Playlist
                            </a>
                        </li>
                    </ul>
                </dialog> */}
                <CardDialog song={song} ref={popoverRef} />
                {/* <div
                    onMouseLeave={() => setOpenOptions(false)}
                    id="dropdown-menu"
                    className={`z-10 ${
                        openOptions ? "block" : "hidden"
                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute bottom-0 left-full`}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                    >
                        <li
                            onClick={() => {
                                dialogRef.current?.showModal();
                                setSelectedSong(song);
                            }}
                        >
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Add to Playlist
                            </a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default MusicCard;
