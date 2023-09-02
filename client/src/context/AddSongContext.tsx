import { createContext, useRef, useState } from "react";
import { Song } from "../types";

export const context = createContext<
    React.MutableRefObject<HTMLDialogElement | null>
>(null!);

const AddSongContext = ({ children }: { children: React.ReactNode }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <context.Provider value={ dialogRef }>
            {children}
        </context.Provider>
    );
};

export default AddSongContext;
