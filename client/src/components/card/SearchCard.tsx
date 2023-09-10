import { useRef, useContext } from "react";

import { Song } from "../../types";
import { SongContext } from "../../context/SongContext";
import { PlaylistContext } from "../../context/PlaylistContext";
import { setCurrentSong } from "../../redux/SongSlice";
import { setPlaylistState } from "../../redux/PlaylistSlice";



import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/Store";

const SearchCard = ({ song }: { song: Song }): React.ReactNode => {
    const imgRef = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    // const { setCurrentSong } = useContext(SongContext);
    // const { setPlaylist, setPlaylistId, setCurrentIndex } =
    //     useContext(PlaylistContext);

    return (
        <div className="flex rounded-md snap-center p-1 md:p-2 md:transition-colors ease-in-out duration-300 bg-secDark md:hover:bg-[#282828]">
            <div
                tabIndex={0}
                onClick={() => {
                    dispatch(setCurrentSong(song));
                    dispatch(setPlaylistState({playlist:[], playlistId:"", currentIndex:0}))
                    // setPlaylist([]);
                    // setPlaylistId("");
                    // setCurrentIndex(0);
                }}
                className={`relative group w-full flex items-start gap-1 lg:gap-3 justify-center flex-row `}
            >
                <div className="relative">
                    <img
                        ref={imgRef}
                        loading="lazy"
                        src={song.coverUrl}
                        onLoad={() =>
                            imgRef.current?.classList.add("imageloaded")
                        }
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
                    <div className="capitalize px-2 lg:px-0 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100">
                        {song.name}
                    </div>
                    <p className="w-full px-2 lg:px-0 text-sm lg:font-normal text-textSecDark line-clamp-1 md:line-clamp-2">
                        {song.artists.map((artist) => artist.name + ", ")}
                    </p>
                </div>
            </div>
            <div
                // onClick={}
                className="group transition-all flex items-center justify-center h-[72px] md:h-[80px] p-2 text-textDark-200 hover:text-textDark-400 cursor-pointer"
            >
                <PlaylistAddIcon
                    className="group-hover:bg-textDark-800"
                    fontSize="medium"
                />
            </div>
        </div>
    );
};

export default SearchCard;
