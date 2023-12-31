// type Props = {};
// import axios from "axios";
import { useContext } from "react";

// import { SongContext } from "../../context/SongContext";
import Controls from "../controls/Controls";
// import { PlaylistContext } from "../../context/PlaylistContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { SongContext } from "../../context/SongContext";
import { setPlaylistState } from "../../redux/PlaylistSlice";
import { RootState } from "../../redux/store/Store";
import { Color } from "../../types";

const Player = () => {
    const { currentSong } = useContext(SongContext);
    // const { currentSong } = useSelector((state: RootState) => state.song);
    const navigate = useNavigate();
    const location = useLocation();
    const playlistId = useSelector(
        (state: RootState) => state.playlist.playlistId
    );
    const dispatch = useDispatch();
    const { setCurrentSong } = useContext(SongContext);
    const closePlayer = () => {
        // console.log()
        setCurrentSong(null);
        dispatch(
            setPlaylistState({
                currentIndex: 0,
                playlistId: "",
                playlistLength: 0,
                queue: [],
            })
        );
    };
    let color: Color | null;
    color = currentSong ? currentSong.tags[1]?.color : null;

    return (
        <div
            onDoubleClick={() =>
                navigate(
                    `${
                        isNaN(Number(playlistId))
                            ? "/userplaylist/"
                            : "/playlist/"
                    }${playlistId}`
                )
            }
            style={{
                background: `linear-gradient(rgba(${color ? color.r : 0},${
                    color ? color.g : 0
                },${color ? color.b : 0},1), rgba(0, 0, 0, 0.3)`,
                backdropFilter: "blur(10px)",
            }}
            className="player-base-color rounded-md after:rounded-md w-[calc(100%-8px)] left-[4px] sticky bottom-1 flex flex-col gap-1 text-textDark-100 z-20"
        >
            {currentSong ? (
                <div
                    className={
                        "flex flex-col lg:flex-row lg:gap-2 justify-center items-center min-w-[300px] relative p-2"
                    }
                    // style={{
                    //     background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    // }}
                >
                    <div className="flex flex-row gap-1 h-full w-full lg:w-max ">
                        <img
                            src={currentSong.coverUrl}
                            alt=""
                            className="w-16 sm:w-20 aspect-square"
                        />
                        <div className="flex flex-col min-w-[150px] line-clamp-1">
                            <span className="font-md font-semibold p-1">
                                {currentSong.name}
                            </span>
                            <span className="inline text-sm  text-gray-300 p-1">
                                {currentSong.artists.map((artist) => (
                                    <span key={artist.name}>
                                        {artist.name + ", "}
                                    </span>
                                ))}
                            </span>
                        </div>
                        {playlistId !== "" ? (
                            <div className="absolute right-0 top-0 flex gap-2">
                                <Link
                                    title="Visit Playlist"
                                    to={`${
                                        isNaN(Number(playlistId))
                                            ? "/userplaylist/"
                                            : "/playlist/"
                                    }${playlistId}`}
                                    className="p-1 rounded-md bg-textDark-800"
                                >
                                    <ArrowOutwardRoundedIcon fontSize="medium" />
                                </Link>
                                {location.pathname.split("/")[1] !==
                                "playlist" ? (
                                    <button
                                        onClick={closePlayer}
                                        title="Close Player"
                                        className="p-1 rounded-md bg-textDark-800"
                                    >
                                        <CloseIcon fontSize="medium" />
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                    <Controls />
                </div>
            ) : // <p className="text-center text-lg">Play a song to see</p>
            null}
        </div>
    );
};

export default Player;
