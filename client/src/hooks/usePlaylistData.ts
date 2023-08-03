import { useState, useEffect } from "react";

import useSWR from "swr";
import { Song } from "../types";

interface Props {
    page: number;
    playlistId: string | undefined;
}

const PlaylistData = ({ page, playlistId }: Props) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/songs${
            playlistId === "0" ? `?page=${page}` : `/${playlistId}?page=${page}`
        }`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnReconnect: false,
            revalidateOnFocus: false,
        }
    );

    useEffect(() => {
        // data && setPlaylist(data.results);
        data && setSongs(data.results);
        // setPlaylistId(Number(playlistId));
    }, [songs]);

    return [songs];
};

export default PlaylistData;
