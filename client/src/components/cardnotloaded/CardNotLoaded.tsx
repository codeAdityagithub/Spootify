// import LoopIcon from "@mui/icons-material/Loop";

const CardNotLoaded = () => {
    return [1, 2, 3, 4, 5].map((idx) => (
        <div
            key={idx}
            className="group min-w-[181px] max-w-[181px] flex items-center gap-2 justify-center flex-col rounded-md snap-center bg-secDark py-4 px-2"
        >
            <div className="relative">
                <div className="w-[150px] h-[150px] flex items-center justify-center animated-load">
                    {/* <LoopIcon fontSize="large" /> */}
                </div>
            </div>
            <div className="w-[150px] h-3 animated-load">
                {/* Loading... */}
            </div>
            <p className="w-[150px] h-6 animated-load">
                {/* Loading... */}
            </p>
        </div>
    ));
};

export default CardNotLoaded;
