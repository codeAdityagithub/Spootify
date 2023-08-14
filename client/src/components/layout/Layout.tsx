// import { useState } from "react";
import Player from "../player/Player";
import { Outlet } from "react-router-dom";
// import { Song } from "../../types";
import SongContextProvider from "../../context/SongContext";
import PlaylistContextProvider from "../../context/PlaylistContext";
import SearchBar from "../searchbar/SearchBar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "../sidebar/Sidebar";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SongContextProvider>
                <PlaylistContextProvider>
                    <div className="w-full h-screen flex flex-row bg-baseDark no-scrollbar">
                        {/* search bar */}
                        <Sidebar>
                            <SearchBar />
                            <Outlet />
                            <Player />
                        </Sidebar>
                    </div>
                </PlaylistContextProvider>
            </SongContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Layout;
