import { Song } from "../types";

// An enum with all the types of actions to use in our reducer
enum playlistActionTypes {
    INCREASE_INDEX = "INCREASE_INDEX",
    DECREASE_INDEX = "DECREASE_INDEX",
    SET_PLAYLIST = "SET_PLAYLIST",
    SET_PLAYLIST_ID = "SET_PLAYLIST_ID",
}

// An interface for our actions
interface playlistAction {
    type: playlistActionTypes;
    payload?: number | Song[];
}

// An interface for our state
interface playlistState {
    currentIndex: number;
    playlist: Song[];
    playlistId: number;
}

export const initialState: playlistState = {
    currentIndex: 0,
    playlist: [],
    playlistId: 0,
};

// Our reducer function that uses a switch statement to handle our actions
export const playlistReducer = (
    state: playlistState,
    action: playlistAction
) => {
    switch (action.type) {
        case playlistActionTypes.INCREASE_INDEX:
            return {
                ...state,
                currentIndex: state.currentIndex + 1,
            };
        case playlistActionTypes.DECREASE_INDEX:
            return {
                ...state,
                currentIndex: state.currentIndex - 1,
            };
        case playlistActionTypes.SET_PLAYLIST:
            return {
                ...state,
                playlist: action.payload,
            };
        case playlistActionTypes.SET_PLAYLIST_ID:
            return {
                ...state,
                playlistId: action.payload,
            };
        default:
            return state;
    }
};
