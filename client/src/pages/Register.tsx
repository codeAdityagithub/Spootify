import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AxiosContext } from "../context/AxiosProvider";


type userType = {
    username: string;
    email: string;
    password: string;
};

type mutationType = {
    mutate: UseMutateFunction<any, unknown, userType, unknown>;
    isLoading: boolean;
    isError: boolean;
    error: any;
};

const createUser = async (data: userType) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
    );
    return res.data;
};

const Register = () => {
    const [user, setUser] = useState<userType>({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { authStatus } = useContext(AxiosContext);
    const { mutate, isLoading, isError, error }: mutationType = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            redirect("/login");
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // isError && console.log(error);

    if (authStatus === "authenticated") return navigate("/");

    return (
        <div className="w-full h-full overflow-y-auto flex relative font-sans justify-center items-center box-border">
            <div className="w-[300px] p-4 bg-secDark rounded-md shadow-md shadow-textDark-800">
                <h2 className="w-full p-2 text-textDark-200 text-center text-2xl">
                    Register
                </h2>
                <form className="w-full p-2" onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        value={user?.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Your Username..."
                        className="w-full p-2 text-textDark-200 placeholder:text-textDark-400 my-2 bg-transparent rounded-md"
                    />
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
                    to="/login"
                    className="text-textDark-400 text-sm p-2 mt-4"
                >
                    Already registered? Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
