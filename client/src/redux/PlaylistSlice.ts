import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Song } from "../types";


type init = {
    currentIndex: number;
    playlist: Song[];
    playlistId: string;
    selectedSong:Song|null;
}
const initialState:init = {
    currentIndex:0,
    playlist:[],
    playlistId:"",
    selectedSong:null
}

export const playlistSlice = createSlice({
  name: 'playlistState',
  initialState,
  reducers: {
        setPlaylistState : (state:init, action:PayloadAction<Omit<init, "selectedSong">>)=>{
            const {currentIndex, playlist, playlistId} = action.payload;

            state.currentIndex=currentIndex
            state.playlist=playlist
            state.playlistId=playlistId
        }, 
        setCurrentIndex : (state:init, action:PayloadAction<number>)=>{
            
            state.currentIndex=action.payload
        },
        // this is for setting selected song in addsongdialog
        setSelectedSong : (state:init, action:PayloadAction<Song>)=>{
            state.selectedSong=action.payload
        },
  },
})

// Action creators are generated for each case reducer function
export const {setCurrentIndex, setPlaylistState, setSelectedSong} = playlistSlice.actions

export default playlistSlice.reducer