import { forwardRef, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { PlaylistContext } from "../../context/PlaylistContext";

import {  setSelectedSong } from "../../redux/PlaylistSlice";


import { Song } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/Store";
type Props = {
    song:Song
};

const CardDialog = forwardRef((props:Props, ref:any) => {
        const dialogRef =
            useOutletContext<React.RefObject<HTMLDialogElement>>();
        const dispatch = useDispatch<AppDispatch>()

        return (
            <dialog
                // onMouseLeave={() => setOpenOptions(false)}
                id="dropdown-menu"
                ref={ref}
                className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700 absolute bottom-0 left-full`}
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                >
                    <li
                        onClick={() => {
                            dialogRef.current?.showModal();
                            dispatch(setSelectedSong(props.song));
                        }}
                    >
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Add to Playlist
                        </a>
                    </li>
                </ul>
            </dialog>
        );
    }
);

export default CardDialog;
