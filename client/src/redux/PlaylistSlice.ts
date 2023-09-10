import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Song } from "../types";

type init = {
    currentIndex: number;
    playlistLength:number;
    playlistId: string;
    selectedSong: Song | null;
};
const initialState: init = {
    currentIndex: 0,
    playlistLength:0,
    playlistId: "",
    selectedSong: null,
};

export const playlistSlice = createSlice({
    name: "playlistState",
    initialState,
    reducers: {
        setPlaylistState: (
            state: init,
            action: PayloadAction<Omit<init, "selectedSong">>
        ) => {
            const { currentIndex, playlistLength, playlistId } = action.payload;

            state.currentIndex = currentIndex;
            state.playlistLength = playlistLength;
            state.playlistId = playlistId;
        },
        updatePlaylistLength: (state: init, action: PayloadAction<number>) => {
            state.playlistLength = action.payload
        },
        setCurrentIndex: (state: init, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        },
        incCurrentIndex: (state: init) => {
            state.currentIndex = state.currentIndex + 1;
        },
        decCurrentIndex: (state: init) => {
            state.currentIndex = state.currentIndex - 1;
        },
        // this is for setting selected song in addsongdialog
        setSelectedSong: (state: init, action: PayloadAction<Song>) => {
            state.selectedSong = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setCurrentIndex,
    setPlaylistState,
    setSelectedSong,
    updatePlaylistLength,
    incCurrentIndex,
    decCurrentIndex,
} = playlistSlice.actions;

export default playlistSlice.reducer;
