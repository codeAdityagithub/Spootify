import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../types";

type init = {
    currentSong: Song | null;
    isPlaying: boolean;
};

const initialState: init = {
    currentSong: null,
    isPlaying: false,
};

const songSlice = createSlice({
    name: "Current Song",
    initialState,
    reducers: {
        setCurrentSong: (state: init, action: PayloadAction<Song|null>) => {
            return {...state, currentSong:action.payload}
        },
        setIsPlaying: (state: init, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
    },
});

export default songSlice.reducer;
export const {setCurrentSong, setIsPlaying} = songSlice.actions;
