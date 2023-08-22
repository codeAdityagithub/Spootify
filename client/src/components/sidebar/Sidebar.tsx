import { useState } from "react";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { Link } from "react-router-dom";
import YourPlaylists from "../yourplaylist/YourPlaylists";

type State = "open" | "closed";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const [sidebarState, setSidebarState] = useState<State>("closed");

    const handleState = () => {
        setSidebarState((prev) => (prev === "open" ? "closed" : "open"));
    };
    const open = (): Boolean => {
        return sidebarState === "open";
    };

    return (
        <>
            <button
                type="button"
                onClick={handleState}
                className="inline-flex absolute top-0 z-20 items-center p-2 mt-2 ml-3 text-sm bg-textDark-800 text-textDark-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <MenuOpenIcon />
            </button>

            <aside
                className={`absolute border-r border-textDark-800 top-0 left-0 z-40 w-64 h-screen ease-linear transition-all${
                    open()
                        ? " -translate-x-0 "
                        : " -translate-x-full md:-translate-x-0 md:w-20 "
                }`}
            >
                {/* CLOSE ICON */}
                <button
                    className={`absolute -right-0${
                        open() ? " md:-right-4 " : " md:-right-8 "
                    }top-1/2 -translate-x-1/2 rounded-md bg-textDark-800 h-14 p-0`}
                    onClick={handleState}
                >
                    {" "}
                    {open() ? (
                        <ArrowLeftRoundedIcon
                            className="text-textDark-200"
                            fontSize="large"
                        />
                    ) : (
                        <ArrowRightRoundedIcon
                            className="text-textDark-200"
                            fontSize="large"
                        />
                    )}
                </button>
                <div className="h-full px-3 py-4 overflow-y-auto bg-secDark">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center justify-center p-2 text-textDark-200 rounded-lg hover:bg-gray-700 group"
                            >
                                <HomeRoundedIcon
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
                        <li>
                            <Link
                                to="/search"
                                className="flex items-center justify-center  p-2 rounded-lg text-textDark-200 hover:bg-gray-700 group"
                            >
                                {/* svg */}
                                <SearchRoundedIcon
                                    fontSize={`${open() ? "medium" : "large"}`}
                                />
                                <span
                                    className={`flex-1 ml-3 whitespace-nowrap ${
                                        open() ? "" : "md:hidden"
                                    }`}
                                >
                                    Search
                                </span>
                                {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full bg-gray-700 dark:text-gray-300">
                                    Pro
                                </span> */}
                            </Link>
                        </li>
                        <li className="w-full h-[1px] bg-textDark-400"></li>
                    </ul>

                    {/* Playlist */}
                    <YourPlaylists open={open} />
                </div>
            </aside>

            <div
                className={`w-full${
                    open()
                        ? " md:w-[calc(100%-256px)] md:ml-64 "
                        : " md:w-[calc(100%-48px)] md:ml-24 "
                }relative h-screen overflow-y-auto no-scrollbar transition-all ease-linear`}
            >
                {children}
            </div>
        </>
    );
};

export default Sidebar;
