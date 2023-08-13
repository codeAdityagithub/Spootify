import { useState } from "react";

import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

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
                className="inline-flex absolute top-0 z-10 items-center p-2 mt-2 ml-3 text-sm bg-textDark-800 text-textDark-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                className={`absolute border-r border-textDark-800 top-0 left-0 z-40 w-64 h-screen transition-all${
                    open()
                        ? " -translate-x-0 "
                        : " -translate-x-full md:-translate-x-56 "
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
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Kanban
                                </span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    Pro
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Inbox
                                </span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Users
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Products
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Sign In
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/* svg */}

                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Sign Up
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div
                className={`w-full${
                    open()
                        ? " md:w-[calc(100%-256px)] md:ml-64 "
                        : " md:w-[calc(100%-48px)] md:ml-12 "
                }relative h-screen overflow-y-auto no-scrollbar transition-all`}
            >
                {children}
            </div>
        </>
    );
};

export default Sidebar;
