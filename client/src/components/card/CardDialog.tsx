import { forwardRef, useContext, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PlaylistContext } from "../../context/PlaylistContext";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { setSelectedSong } from "../../redux/PlaylistSlice";

import { Song } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/Store";
type Props = {
    song: Song;
    pos: string;
};

const CardDialog = (props: Props) => {
    const [openOptions, setOpenOptions] = useState(false);
    const popoverRef = useRef<HTMLDialogElement>(null);

    const dialogRef = useOutletContext<React.RefObject<HTMLDialogElement>>();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <button
            className="absolute rounded-md bottom-0 -translate-y-1/2 right-3 z-10 hover:bg-gray-700"
            onClick={() => {
                if (!openOptions) popoverRef.current?.show();
                else popoverRef.current?.close();

                setOpenOptions((prev) => !prev);
            }}
        >
            <MoreVertIcon className="text-white" />
            <dialog
                onMouseLeave={() => {
                    setOpenOptions(false);
                    popoverRef?.current?.close();
                }}
                id="dropdown-menu"
                ref={popoverRef}
                className={`z-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700 absolute bottom-0 ${props.pos}`}
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
        </button>
    );
};

export default CardDialog;
