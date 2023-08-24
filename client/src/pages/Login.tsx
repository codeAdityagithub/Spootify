import {
    UseMutateFunction,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { UserType } from "../types";

type Props = {};

type userType = {
    email: string;
    password: string;
};

type mutationType = {
    mutate: UseMutateFunction<any, unknown, userType, unknown>;
    isLoading: boolean;
    isError: boolean;
    error: any;
    isSuccess: boolean;
};

const loginUser = async (data: userType) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
    );
    return res.data;
};

const Login = () => {
    const [user, setUser] = useState<userType>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setCurrentUser } = useContext(AuthContext);

    const { mutate, isLoading, isError, error, isSuccess }: mutationType =
        useMutation({
            mutationFn: loginUser,
            onSuccess: (data: UserType) => {
                setCurrentUser(data);
                // queryClient.invalidateQueries(["userPlaylists"]);
            },
        });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    useEffect(() => {
        // isSuccess && navigate("/");
    }, [isSuccess]);

    return (
        <div className="w-full h-full overflow-y-auto flex relative font-sans justify-center items-center box-border">
            <div className="w-[300px] p-4 bg-secDark rounded-md shadow-md shadow-textDark-800">
                <h2 className="w-full p-2 text-textDark-200 text-center text-2xl">
                    Login
                </h2>
                <form className="w-full p-2" onSubmit={handleSubmit}>
                    <input
                        required
                        type="email"
                        value={user?.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Your email..."
                        className="w-full p-2 text-textDark-200 placeholder:text-textDark-400 my-2 bg-transparent rounded-md"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={user?.password}
                        placeholder="Your Password"
                        className="w-full p-2 text-textDark-200 placeholder:text-textDark-400 my-2 bg-transparent rounded-md"
                    />
                    <button className="button w-full my-4" disabled={isLoading}>
                        Submit
                    </button>
                </form>
                {isError ? (
                    <p className="text-red-500 text-sm p-2">
                        {error.response.data}
                    </p>
                ) : null}
                <Link
                    to="/register"
                    className="text-textDark-400 text-sm p-2 mt-4"
                >
                    New User? Register Here
                </Link>
            </div>
        </div>
    );
};

export default Login;