// import { useState } from "react";
import Player from "../player/Player";
import { Outlet } from "react-router-dom";
// import { Song } from "../../types";
import SongContextProvider from "../../context/SongContext";
import PlaylistContextProvider from "../../context/PlaylistContext";
import SearchBar from "../searchbar/SearchBar";

const Layout = () => {
    return (
        <SongContextProvider>
            <div className="w-full h-min min-h-screen  bg-baseDark no-scrollbar">
                <PlaylistContextProvider>
                    {/* search bar */}
                    <SearchBar />
                    <Outlet />
                    <Player />
                </PlaylistContextProvider>
            </div>
        </SongContextProvider>
    );
};

export default Layout;
