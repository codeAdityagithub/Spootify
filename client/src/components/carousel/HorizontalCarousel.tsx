import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/Store";

import { setCurrentIndex } from "../../redux/PlaylistSlice";

const HorizontalCarousel = ({
    children,
    title,
    playlistId,
}: {
    children: React.ReactNode;
    title: string;
    playlistId?: string;
}) => {
    const id = useSelector((state:RootState)=>state.playlist.playlistId)
    // const { setCurrentIndex} = useContext(PlaylistContext);
    const dispatch = useDispatch<AppDispatch>();


    return (
        <div className="w-full text-gray-200">
            <div className="flex flex-row items-center mb-4">
                <div className="text-lg pl-2 font-bold md:text-xl">{title}</div>
                {playlistId ? (
                    <Link
                        className="ml-auto pr-5 underline cursor-pointer"
                        to={`/playlist/${playlistId}`}
                        onClick={() =>
                            id !== playlistId && dispatch(setCurrentIndex(0))
                        }
                    >
                        Play All
                    </Link>
                ) : null}
            </div>
            <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 scroll-smooth snap-x relative">
                {children}
            </div>
        </div>
    );
};

export default HorizontalCarousel;
