import LoopIcon from "@mui/icons-material/Loop";

const CardNotLoaded = () => {
    return [1, 2, 3, 4, 5].map((idx) => (
        <div
            key={idx}
            className="group min-w-[181px] max-w-[181px] flex items-center justify-center flex-col rounded-md snap-center bg-secDark p-1 md:p-2 lg:p-4 md:transition-colors ease-in-out duration-300 md:hover:bg-[#282828]"
        >
            <div className="relative">
                <div className="w-[150px] h-[150px] flex items-center justify-center animate-spin">
                    <LoopIcon fontSize="large" />
                </div>
            </div>
            <div className="w-full capitalize pt-2 px-2 lg:px-0 line-clamp-1 lg:line-clamp-1 font-semibold mb-2 text-textDark-100">
                Loading...
            </div>
            <p className="hidden w-full lg:block lg:text-sm lg:font-normal text-textSecDark line-clamp-2">
                Loading...
            </p>
        </div>
    ));
};

export default CardNotLoaded;
