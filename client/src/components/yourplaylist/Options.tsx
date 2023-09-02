import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";

const Options = ({ open }: { open: () => Boolean }) => {
    return (
        <>
            <li className="button flex items-center justify-start text-textDark-200 rounded-lg">
                <Link to="/login" className="w-full">
                    <LoginIcon fontSize={`${open() ? "medium" : "large"}`} />
                    <span
                        className={`flex-1 ml-3 ${open() ? "" : "md:hidden"}`}
                    >
                        Login
                    </span>
                </Link>
            </li>
            <li className="button flex items-center justify-start text-textDark-200 rounded-lg">
                <Link to="/register" className="w-full">
                    <HowToRegIcon fontSize={`${open() ? "medium" : "large"}`} />
                    <span
                        className={`flex-1 ml-3 ${open() ? "" : "md:hidden"}`}
                    >
                        Register
                    </span>
                </Link>
            </li>
        </>
    );
};

export default Options;
