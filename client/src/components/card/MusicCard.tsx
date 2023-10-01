import { useRef, useContext } from "react";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";
import CardDialog from "./CardDialog";

// import { setCurrentSong } from "../../redux/SongSlice";
import { setCurrentIndex } from "../../redux/PlaylistSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/Store";
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


    const { currentSong, setCurrentSong } = useContext(SongContext);
    // const { setSelectedSong } = useContext(PlaylistContext);
    // const { currentIndex } = useSelector((state: RootState) => state.playlist);
    const dispatch = useDispatch<AppDispatch>();


    const handleClick = () => {
        setCurrentSong(song);
        dispatch(setCurrentIndex(index));
    };
   

    return (
        <div
            className={
                "relative min-w-[181px] max-w-[181px] flex items-center justify-start flex-col rounded-md snap-center p-1 pb-10 md:p-2 md:pb-10 lg:p-4 lg:pb-6 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]" +
                (currentSong?.name == song.name
                    ? " bg-[#282828]"
                    : " bg-secDark")
            }
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
                    className={
                        "absolute w-12 h-12 rounded-full hover:bg-green-400 text-baseDark right-2 flex items-center justify-center group-hover:opacity-100 group-hover:bottom-2 transition-all ease-in-out duration-300" +
                        (currentSong?.name == song.name
                            ? " bg-green-400 bottom-2 opacity-100"
                            : " bg-green-500 opacity-0 bottom-0")
                    }
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
            <p className="w-full block text-sm pl-2 lg:p-0 text-textSecDark line-clamp-1">
                {song.artists.map((artist) => (
                    <span key={artist.name}>{artist.name + ", "}</span>
                ))}
            </p>

            <CardDialog song={song} pos="-left-52 md:left-8" />
        </div>
    );
};

export default MusicCard;
