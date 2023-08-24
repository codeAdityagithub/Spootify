import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

import AddIcon from "@mui/icons-material/Add";
import FeaturedPlayList from "@mui/icons-material/FeaturedPlayList";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

type Props = {
    open: () => Boolean;
};

const getPlaylists = async (id: string, token: string) => {
    console.log(id, token);
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/playlists/${id}`,
        {
            headers: { authorization: "Bearer " + token },
        }
    );
    return res.data;
};

const YourPlaylists = ({ open }: Props) => {
    const { _id: id, accessToken: token } = useContext(AuthContext);

    const { data, isError, status } = useQuery({
        queryKey: ["userPlaylists", id],
        queryFn: async () => await getPlaylists(id, token),
        enabled: id !== "",
    });

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
                <Link
                    to="#"
                    className="text-textDark-200 rounded-lg hover:bg-gray-700 ml-auto group p-2"
                >
                    <AddIcon fontSize={`${open() ? "medium" : "large"}`} />
                </Link>
            </li>

            {/* user playlists */}
            {isError || status === "loading" ? (
                <>
                    <li className="button flex items-center justify-start p-2 text-textDark-200 rounded-lg">
                        <Link to="/login" className="">
                            <LoginIcon
                                fontSize={`${open() ? "medium" : "large"}`}
                            />
                            <span
                                className={`flex-1 ml-3 ${
                                    open() ? "" : "md:hidden"
                                }`}
                            >
                                Login
                            </span>
                        </Link>
                    </li>
                    <li className="button flex items-center justify-start p-2 text-textDark-200 rounded-lg">
                        <Link to="/register" className="">
                            <HowToRegIcon
                                fontSize={`${open() ? "medium" : "large"}`}
                            />
                            <span
                                className={`flex-1 ml-3 ${
                                    open() ? "" : "md:hidden"
                                }`}
                            >
                                Register
                            </span>
                        </Link>
                    </li>
                </>
            ) : (
                <li>
                    <Link
                        to="/"
                        className="flex items-center justify-center p-2 text-textDark-200 rounded-lg hover:bg-gray-700 group"
                    >
                        <FeaturedPlayList
                            fontSize={`${open() ? "medium" : "large"}`}
                        />
                        <span
                            className={`flex-1 ml-3 whitespace-nowrap ${
                                open() ? "" : "md:hidden"
                            }`}
                        >
                            Home
                        </span>
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default YourPlaylists;
