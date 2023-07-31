import React, { createContext, useState } from "react";
import { Song } from "../types";

type playlistContextType = {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    playlist: Song[];
    setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
    playlistId: number;
    setPlaylistId: React.Dispatch<React.SetStateAction<number>>;
};

export const PlaylistContext = createContext<playlistContextType>(null!);

const PlaylistContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [playlistId, setPlaylistId] = useState(-1);

    return (
        <PlaylistContext.Provider
            value={{
                currentIndex,
                setCurrentIndex,
                playlist,
                setPlaylist,
                playlistId,
                setPlaylistId,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContextProvider;
