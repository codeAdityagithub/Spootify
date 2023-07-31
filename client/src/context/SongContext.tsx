import { createContext, useState } from "react";
import { Song } from "../types";

export const SongContext = createContext<{
    currentSong: Song | "";
    setCurrentSong: React.Dispatch<React.SetStateAction<"" | Song>>;
}>(null!);

const SongContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | "">("");

    return (
        <SongContext.Provider value={{ currentSong, setCurrentSong }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongContextProvider;
