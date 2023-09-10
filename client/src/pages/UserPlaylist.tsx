import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

// import { Song } from "../types";
// import { Genre } from "../enums";

import PlaylistCard from "../components/card/PlaylistCard";
import { SongContext } from "../context/SongContext";
import { PlaylistContext } from "../context/PlaylistContext";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";

import { AxiosContext } from "../context/AxiosProvider";
import { AppDispatch, RootState } from "../redux/store/Store";

import { setPlaylistState } from "../redux/PlaylistSlice";
// import { setCurrentSong } from "../redux/SongSlice";
import { Song } from "../types";
import CardDialog from "../components/card/CardDialog";

type Props = {};

const UserPlaylist = (props: Props) => {
    const { playlistId } = useParams();
    const token = useSelector((state: RootState) => state.user.accessToken);
    // const currentSong = useSelector((state: RootState) => state.song.currentSong);
    // const {currentIndex, playlistLength, playlistId:p_id} = useSelector((state: RootState) => state.playlist);

    const dispatch = useDispatch<AppDispatch>();

    const { currentSong, setCurrentSong } = useContext(SongContext);
    // const { accessToken: token } = useContext(AuthContext);

    const { instance } = useContext(AxiosContext);
    // const {
    //     currentIndex,
    //     setCurrentIndex,
    //     setPlaylist,
    //     setPlaylistId,
    //     playlist,
    //     playlistId: p_id,
    // } = useContext(PlaylistContext);

    const [playlistName, setPlaylistName] = useState("");

    const { data } = useQuery({
        queryKey: ["userPlaylist", playlistId],
        queryFn: async (): Promise<{ name: string; songs: Song[] }> => {
            const data = await instance
                .get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/user/getsongs/${playlistId}`,
                    {
                        headers: { authorization: "Bearer " + token },
                    }
                )
                .then((res) => res.data.playlist);
            // console.log(data);
            return data;
        },
    });

    // songs = data && data.results;

    useEffect(() => {
        data?.songs.length === 0 && setCurrentSong(null);
        data && setPlaylistName(data.name);
        if (data) {
            playlistId &&
                dispatch(
                    setPlaylistState({
                        queue: data.songs,
                        playlistLength: data.songs.length,
                        playlistId: playlistId,
                        currentIndex: 0,
                    })
                );
            // dispatch(setCurrentSong(data[0]));
        }
    }, [data]);

    return (
        <div className="w-full pb-[20px] ">
            {/* top image */}
            <div
                className={`w-full  h-[500px] md:h-[350px]  flex items-end justify-start relative mb-2 overflow-hidden`}
            >
                {currentSong ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="absolute self-stretch w-full top-1/2 -translate-y-1/2 blur-sm brightness-50 select-none"
                        // className="absolute top-0 left-1/2 -translate-x-1/2 "
                    />
                ) : (
                    <img
                        src={"/playlist.png"}
                        alt={"Empty playlist image"}
                        className="absolute self-stretch w-full top-1/2 -translate-y-1/2 blur-sm select-none"
                        // className="absolute top-0 left-1/2 -translate-x-1/2 "
                    />
                )}
                {currentSong ? (
                    <div className="absolute flex flex-col md:flex-row top-2 left-1/2 -translate-x-1/2 select-none backdrop-blur-md backdrop-brightness-50  shadow-lg shadow-gray-800">
                        <img
                            src={currentSong.coverUrl}
                            alt={currentSong.name}
                            className="min-w-[300px] min-h-[300px] select-none"
                        />
                        <div className="flex flex-col items-start justify-start gap-4 p-2 md:ml-3 md:pt-4 md:w-32 lg:w-48">
                            <div className="w-full text-left text-textDark-200 text-2xl font-bold relative">
                                {currentSong.name}
                            </div>
                            <p className="w-full block text-justify lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                                {currentSong.artists.map((artist) => (
                                    <span key={artist.name}>
                                        {artist.name + ", "}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                ) : null}
                {currentSong && (
                    <>
                        <CardDialog
                            song={currentSong}
                            pos="-left-44 md:-left-52"
                        />
                    </>
                )}
            </div>
            {/* playlist items */}
            <div className="min-h-[calc(100vh-400px)] flex flex-col items-center justify-start gap-2 overflow-auto md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                {data &&
                    data.songs.map((song, index) => (
                        <PlaylistCard key={index} song={song} index={index} />
                    ))}
            </div>
        </div>
    );
};

export default UserPlaylist;
