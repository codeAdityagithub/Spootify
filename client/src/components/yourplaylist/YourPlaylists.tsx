import AddIcon from "@mui/icons-material/Add";
import FeaturedPlayList from "@mui/icons-material/FeaturedPlayList";
import { Link } from "react-router-dom";

type Props = {
    open: () => Boolean;
};

const YourPlaylists = ({ open }: Props) => {
    return (
        <ul className="space-y-2 font-medium w-full">
            <li className="p-2 rounded-lg text-textDark-200 w-full flex items-center justify-center ">
                <span
                    className={`flex-1 whitespace-nowrap ${
                        open() ? "" : "md:hidden"
                    }`}
                >
                    Your Playlists:
                </span>
                <Link
                    to="/"
                    className="text-textDark-200 rounded-lg hover:bg-gray-700 ml-auto group p-2"
                >
                    <AddIcon fontSize={`${open() ? "medium" : "large"}`} />
                </Link>
            </li>
            <li>
                <Link
                    to="/"
                    className="flex items-center justify-center p-2 text-textDark-200 rounded-lg hover:bg-gray-700 group"
                >
                    <FeaturedPlayList
                        fontSize={`${open() ? "medium" : "large"}`}
                    />
                    <span
                        className={`flex-1 ml-3 whitespace-nowrap ${
                            open() ? "" : "md:hidden"
                        }`}
                    >
                        Home
                    </span>
                </Link>
            </li>
        </ul>
    );
};

export default YourPlaylists;
