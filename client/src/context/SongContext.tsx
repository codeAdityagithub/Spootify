import { createContext, useState } from "react";
import { Song } from "../types";

export const SongContext = createContext<{
    currentSong: Song | null;
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
}>(null!);

const SongContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongContextProvider;
