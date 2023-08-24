// import { useState } from "react";
import Player from "../player/Player";
import { Outlet } from "react-router-dom";
// import { Song } from "../../types";
import SongContextProvider from "../../context/SongContext";
import PlaylistContextProvider from "../../context/PlaylistContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "../sidebar/Sidebar";
import AuthContextProvider from "../../context/AuthProvider";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SongContextProvider>
                <PlaylistContextProvider>
                    <AuthContextProvider>
                        <div className="w-full h-screen flex flex-row bg-baseDark no-scrollbar">
                            {/* search bar */}
                            <Sidebar>
                                <Outlet />
                                <Player />
                            </Sidebar>
                        </div>
                    </AuthContextProvider>
                </PlaylistContextProvider>
            </SongContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Layout;
