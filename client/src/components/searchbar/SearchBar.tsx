import { useState } from "react";
import { Genre, Mood } from "../../enums";


import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Search from "../../pages/Search";

interface formDataType {
    query: string;
    genre: string;
    mood: string;
}

const SearchBar = () => {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataType>({
        query: "",
        genre: "",
        mood: "",
    });

    const genres = Object.keys(Genre).filter((key) => !isNaN(Number(key)));
    const moods = Object.keys(Mood).filter((key) => !isNaN(Number(key)));

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // if (name === "genre") {
        //     navigate(
        //         `/search?query=${formData.query}&genre=${value}&mood=${formData.mood}`
        //     );
        // }
        // if (name === "mood") {
        //     navigate(
        //         `/search?query=${formData.query}&genre=${formData.genre}&mood=${value}`
        //     );
        // }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // navigate(
        //     `/search?query=${formData.query}&genre=${formData.genre}&mood=${formData.mood}`
        // );
    };

    return (
        <div className="search flex flex-col h-min min-h-full">
            <form
                className="w-full p-4 flex flex-col lg:flex-row gap-2 items-center sm:items-start justify-start z-10 pt-12 md:p-4"
                onSubmit={(e) => handleSubmit(e)}
            >
                {/* search query */}
                <div className="w-full sm:w-96 lg:w-64 mx-4 relative">
                    <input
                        type="text"
                        value={formData.query}
                        name="query"
                        onChange={(e) => handleChange(e)}
                        placeholder="Search..."
                        className="w-full sm:w-96 lg:w-64 px-4 py-2 text-sm bg-secDark text-textDark-300 placeholder:text-textDark-400 border border-textDark-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button type="submit">
                        <SearchRoundedIcon
                            className="text-textDark-200 absolute right-1 top-0 translate-y-[7px]"
                            fontSize="medium"
                            onClick={() => console.log("hi")}
                        />
                    </button>
                </div>
                {/* genre filter */}
                <select
                    value={formData.genre}
                    name="genre"
                    onChange={(e) => handleChange(e)}
                    className="w-full sm:w-96 lg:w-64 px-4 py-2 mx-4 text-sm bg-secDark text-textDark-300  border border-textDark-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value={""}>Search Genre...</option>
                    {genres.map((key) => (
                        <option key={key} value={key}>
                            {Genre[Number(key)]}
                        </option>
                    ))}
                </select>
                <select
                    value={formData.mood}
                    name="mood"
                    onChange={(e) => handleChange(e)}
                    className="w-full sm:w-96 lg:w-64 px-4 py-2 mx-4 text-sm bg-secDark text-textDark-300  border border-textDark-500 rounded-2xl focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value={""}>Search Mood...</option>
                    {moods.map((key) => (
                        <option key={key} value={key}>
                            {Mood[Number(key)]}
                        </option>
                    ))}
                </select>
            </form>
            <Search
                query={formData.query}
                genre={formData.genre}
                mood={formData.mood}
            />
        </div>
    );
};

export default SearchBar;
