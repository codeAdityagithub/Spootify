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
import { useSelector } from "react-redux";

import { AxiosContext } from "../context/AxiosProvider";
import { RootState } from "../redux/store/Store";

type Props = {};

const UserPlaylist = (props: Props) => {
    const { playlistId } = useParams();
    const token = useSelector((state: RootState) => state.user.accessToken);

    const { currentSong, setCurrentSong } = useContext(SongContext);
    // const { accessToken: token } = useContext(AuthContext);

    const { instance } = useContext(AxiosContext);
    const {
        currentIndex,
        setCurrentIndex,
        setPlaylist,
        setPlaylistId,
        playlist,
        playlistId: p_id,
    } = useContext(PlaylistContext);

    const [playlistName, setPlaylistName] = useState("");

    const { data } = useQuery({
        queryKey: ["userPlaylist", playlistId],
        queryFn: async () => {
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
        data && setPlaylist(data.songs);
        playlist.length === 0 && setCurrentSong("");
        data && setPlaylistName(data.name);
        playlistId && setPlaylistId(playlistId);
    }, [data]);

    return (
        <div className="w-full pb-[20px] ">
            {/* top image */}
            <div
                className={`w-full h-[350px] flex items-end justify-start relative mb-2 overflow-hidden`}
            >
                {currentSong !== "" ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="absolute self-stretch w-full top-1/2 -translate-y-1/2 blur-sm select-none"
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
                {currentSong !== "" ? (
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.name}
                        className="absolute top-2 left-1/2 -translate-x-1/2 select-none shadow-gray-800"
                    />
                ) : null}
                <div className="w-full text-textDark-200 text-xl font-extrabold p-4 relative">
                    Playlist-{playlistName?.toLocaleUpperCase()}
                </div>
            </div>
            {/* playlist items */}
            <div className="min-h-[calc(100vh-400px)] flex flex-col items-center justify-start gap-2 overflow-auto md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x">
                {playlist &&
                    playlist.map((song, index) => (
                        <PlaylistCard
                            key={index}
                            song={song}
                            index={index}
                            isCurrent={currentIndex === index}
                            setCurrentIndex={setCurrentIndex}
                        />
                    ))}
            </div>
        </div>
    );
};

export default UserPlaylist;
