import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AxiosContext } from "../../context/AxiosProvider";
import { RootState } from "../../redux/store/Store";
import { playlistSidebar } from "../../types";
import Dialog from "./Dialog";
import Options from "./Options";

type Props = {
    open: () => Boolean;
};

const YourPlaylists = ({ open}: Props) => {
    const { accessToken: token, _id } = useSelector(
        (state: RootState) => state.user
    );
    const { instance, authStatus } = useContext(AxiosContext);
    const [firstTry, setFirstTry] = useState(true);

    // const imageRef = useRef<HTMLImageElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { data, isError } = useQuery<[playlistSidebar]>({
        queryKey: ["userPlaylists", _id],
        queryFn: async () => {
            const res = await instance.get(
                `${import.meta.env.VITE_API_URL}/user/playlists`,
                {
                    headers: { authorization: "Bearer " + token },
                }
            );
            // console.log(res.data.playlists);
            return res.data.playlists;
        },

        refetchInterval: 1000 * 60 * 5,
        enabled: firstTry || authStatus === "authenticated",
    });

    useEffect(() => {
        if (isError) setFirstTry(false);
    }, [isError]);

    return (
        <ul className="space-y-2 font-medium w-full">
            <li className="p-2 rounded-lg text-textDark-200 w-full flex items-center justify-center ">
                <span
                    className={`flex-1 whitespace-nowrap ${
                        open() ? "" : "md:hidden"
                    }`}
                >
                    Your Playlists:
                </span>
                {authStatus == "unauthenticated" ? null : (
                    <>
                        {/* Open the modal using ID.showModal() method */}
                        <button
                            onClick={() => {
                                dialogRef?.current?.showModal();
                            }}
                            className="text-textDark-200 rounded-lg hover:bg-gray-700 ml-auto group p-2"
                        >
                            <AddIcon
                                fontSize={`${open() ? "medium" : "large"}`}
                            />
                        </button>

                        <Dialog dialogRef={dialogRef} />
                    </>
                )}
            </li>

            {/* user playlists */}
            {authStatus == "unauthenticated" ? (
                <Options open={open} />
            ) : (
                <div className="playlists">
                    {data &&
                        data.map((playlist) => (
                            <Link
                                to={`/userplaylist/${playlist._id}`}
                                className="w-full text-textDark-200 p-2 flex flex-row hover:bg-gray-700 rounded-md cursor-pointer"
                                key={playlist._id}
                            >
                                <img
                                    src={
                                        playlist?.firstSongCover
                                            ? playlist.firstSongCover
                                            : "/playlist.png"
                                    }
                                    alt="card"
                                    className={`${
                                        open() ? "w-12" : "w-10"
                                    } aspect-square object-cover rounded-md transition-all duration-300 mr-3`}
                                />
                                <span className={`${open() ? "" : "hidden "}`}>
                                    {playlist.name}
                                </span>
                            </Link>
                        ))}
                </div>
            )}
        </ul>
    );
};

export default YourPlaylists;
