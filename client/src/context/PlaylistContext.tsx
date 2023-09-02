import React, { createContext, useState } from "react";
import { Song } from "../types";

type playlistContextType = {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    playlist: Song[];
    setPlaylist: React.Dispatch<React.SetStateAction<Song[]>>;
    playlistId: string;
    setPlaylistId: React.Dispatch<React.SetStateAction<string>>;
    selectedSong:Song|undefined;
    setSelectedSong: React.Dispatch<React.SetStateAction<Song | undefined>>
};

export const PlaylistContext = createContext<playlistContextType>(null!);

const PlaylistContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [playlistId, setPlaylistId] = useState("");
    const [selectedSong, setSelectedSong] = useState<Song>();
    return (
        <PlaylistContext.Provider
            value={{
                currentIndex,
                setCurrentIndex,
                playlist,
                setPlaylist,
                playlistId,
                setPlaylistId,
                selectedSong,
                setSelectedSong
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContextProvider;
