import {
    UseMutateFunction,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AxiosContext } from "../../context/AxiosProvider";

import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";


type mutationType = {
    mutate: UseMutateFunction<any, unknown, void, unknown>;
    isLoading: boolean;
    isError: boolean;
    error: any;
    isSuccess: boolean;
};

const Dialog = ({
    dialogRef,
}: {
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}) => {
    const [playlistName, setPlaylistName] = useState("");
    const { instance } = useContext(AxiosContext);
    // const { accessToken: token, _id } = useContext(AuthContext);
    const { accessToken: token, _id } = useSelector((state:RootState)=>state.user)

    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error, isSuccess }: mutationType =
        useMutation({
            mutationFn: async () => {
                await instance.post(
                    `${import.meta.env.VITE_API_URL}/user/addplaylist`,
                    {
                        playlistName,
                    },
                    {
                        headers: { authorization: "Bearer " + token },
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
            id="my_modal_1"
            className="w-[300px] md:w-[450px] lg:w-[500px] rounded-md p-2 bg-slate-900 text-textDark-200 relative"
            ref={dialogRef}
        >
            <form method="dialog" className="w-full flex justify-end">
                <button className="button border-red-300 p-0 rounded-full">
                    <CloseIcon />
                </button>
            </form>
            <h2 className="w-full text-2xl text-center">Add a Playlist</h2>
            <form className="w-full p-10" onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    value={playlistName}
                    name="playlistName"
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Playlist Name"
                    className="w-full p-2 text-textDark-200 placeholder:text-textDark-400 my-2 bg-transparent rounded-md"
                />

                <div className="submitbtn">
                    <button
                        className="button border-green-200 py-2 mt-2 w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                </div>
            </form>
            {isError ? (
                <p className="text-red-500 text-sm text-center">
                    {error.response.data}
                </p>
            ) : null}
            {isSuccess ? (
                <p className="text-green-500 text-sm text-center">
                    Playlist added Succesfully!
                </p>
            ) : null}
        </dialog>
    );
};

export default Dialog;
