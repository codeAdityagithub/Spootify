// import { useState } from "react";
import Player from "../player/Player";
import { Outlet } from "react-router-dom";
// import { Song } from "../../types";
import SongContextProvider from "../../context/SongContext";
import PlaylistContextProvider from "../../context/PlaylistContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Sidebar from "../sidebar/Sidebar";
// import AuthContextProvider from "../../context/AuthProvider";
import AxiosContextProvider from "../../context/AxiosProvider";
// import AddSongDialog from "../addsongtolist/AddSongDialog";
// import AddSongContext from "../../context/AddSongContext";

import { store } from "../../redux/store/Store";
import { Provider } from "react-redux";

import { useRef } from "react";

import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

const Layout = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SongContextProvider>
                    <AxiosContextProvider>
                        <div className="w-full h-screen flex flex-row bg-baseDark no-scrollbar">
                            {/* search bar */}
                            <Toaster position="bottom-center" />
                            <Sidebar>
                                <Outlet context={dialogRef} />
                                <Player />
                            </Sidebar>
                        </div>
                    </AxiosContextProvider>
                </SongContextProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </Provider>
    );
};

export default Layout;
