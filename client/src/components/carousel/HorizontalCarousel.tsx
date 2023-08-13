import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { PlaylistContext } from "../../context/PlaylistContext";

const HorizontalCarousel = ({
    children,
    title,
    playlistId,
}: {
    children: React.ReactNode;
    title: string;
    playlistId?: string;
}) => {
    const { setCurrentIndex, playlistId: id } = useContext(PlaylistContext);

    return (
        <div className="w-full text-gray-200">
            <div className="flex flex-row items-center mb-4">
                <div className="text-lg pl-2 font-bold md:text-xl">{title}</div>
                {playlistId ? (
                    <Link
                        className="ml-auto pr-5 underline cursor-pointer"
                        to={`/playlist/${playlistId}`}
                        onClick={() =>
                            id !== Number(playlistId) && setCurrentIndex(0)
                        }
                    >
                        Play All
                    </Link>
                ) : null}
            </div>
            <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 no-scrollbar scroll-smooth snap-x relative">
                {children}
            </div>
        </div>
    );
};

export default HorizontalCarousel;
