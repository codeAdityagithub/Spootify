import {
    UseMutateFunction,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AxiosContext } from "../../context/AxiosProvider";

import CloseIcon from "@mui/icons-material/Close";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { playlistSidebar } from "../../types";
import { useOutletContext } from "react-router-dom";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store/Store";
import Options from "../yourplaylist/Options";

type Props = {};

type mutationType = {
    mutate: UseMutateFunction<any, unknown, void, unknown>;
    isLoading: boolean;
    isError: boolean;
    error: any;
    isSuccess: boolean;
};

const Dialog = () => {
    const [playlistName, setPlaylistName] = useState("");
    const { instance } = useContext(AxiosContext);
    // const { selectedSong, setSelectedSong } = useContext(PlaylistContext);

    const { accessToken: token, _id } = useSelector(
        (state: RootState) => state.user
    );
    const { selectedSong } = useSelector((state: RootState) => state.playlist);

    const dialogRef = useOutletContext<React.RefObject<HTMLDialogElement>>();
    const queryClient = useQueryClient();

    const { data } = useQuery<[playlistSidebar]>({
        queryKey: ["userPlaylists", _id],
        queryFn: async () => {
            const res = await instance.get(
                `${import.meta.env.VITE_API_URL}/user/playlists`,
                {
                    headers: { authorization: "Bearer " + token },
                }
            );
            return res.data.playlists;
        },
    });

    const { mutate, isLoading, isError, error, isSuccess }: mutationType =
        useMutation({
            mutationFn: async () => {
                await instance.post(
                    `${import.meta.env.VITE_API_URL}/user/addsong`,
                    {
                        song: selectedSong,
                        playlistName,
                    },
                    {
                        headers: { authorization: "Bearer " + token },
                        withCredentials: true,
                    }
                );
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["userPlaylists", _id]);
                setPlaylistName("");
            },
        });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return (
        <dialog
            id="my_modal_2"
            className="w-[300px] md:w-[450px] lg:w-[500px] rounded-md p-2 bg-slate-900 text-textDark-200 relative no-scrollbar"
            ref={dialogRef}
        >
            <h2 className="w-full text-lg md:text-xl text-left backdrop-blur-sm">
                Adding Song:
            </h2>
            <div className="selectedsong flex flex-row m-1 rounded-md bg-baseDark">
                <div className="relative">
                    <img
                        src={selectedSong?.coverUrl}
                        alt="selected song"
                        className="w-16 m-1 aspect-square object-cover rounded-md "
                    />
                </div>
                <div className="capitalize pl-2 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100">
                    {selectedSong?.name}
                </div>
            </div>

            <form
                method="dialog"
                className="w-full flex justify-end my-4 sticky top-0"
            >
                <h2 className="w-full text-lg md:text-xl text-left backdrop-blur-sm">
                    Select a Playlist:
                </h2>
                <button
                    onClick={() => setPlaylistName("")}
                    className="button border-red-300 p-0 rounded-full"
                >
                    <CloseIcon />
                </button>
            </form>

            {isError ? (
                <p className="text-red-500 text-sm text-center">
                    {error.response.data}
                </p>
            ) : null}
            {isSuccess ? (
                <p className="text-green-500 text-sm text-center">
                    Song added Succesfully!
                </p>
            ) : null}
            <div className="playlists">
                {data ?
                    data.map((playlist) => (
                        <div
                            className={`${
                                playlistName === playlist.name
                                    ? "bg-gray-700 "
                                    : ""
                            }w-full text-textDark-200 p-2 m-1 flex flex-row hover:bg-gray-700 rounded-md cursor-pointer transition-colors duration-200`}
                            key={playlist._id}
                            onClick={() => setPlaylistName(playlist.name)}
                        >
                            <img
                                src={
                                    playlist?.firstSongCover
                                        ? playlist.firstSongCover
                                        : "playlist.png"
                                }
                                alt="card"
                                className={`w-12 aspect-square object-cover rounded-md transition-all duration-300 mr-3`}
                            />
                            <span>{playlist.name}</span>
                            <button
                                disabled={playlistName !== playlist.name}
                                onClick={() => mutate()}
                                className={`${
                                    playlistName === playlist.name
                                        ? ""
                                        : "hidden "
                                }ml-auto z-10 flex items-center p-2 rounded-full hover:text-green-100`}
                            >
                                <PlaylistAddIcon />
                            </button>
                        </div>
                    ))
                :<Options open={()=>true}/>
                }
            </div>
        </dialog>
    );
};

export default Dialog;
