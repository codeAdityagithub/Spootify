import { createContext, useState } from "react";
import { UserType } from "../types";

import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";

import { useDispatch } from "react-redux";
import { setAccessToken, setUserDetails } from "../redux/UserSlice";
// import { AuthContext } from "./AuthProvider";

// interface AuthType extends UserType {
//     setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>;
// }

interface decodeType extends UserType {
    iat: number;
    exp: number;
}

type statusType = "authenticated" | "unauthenticated";

type authContext = {
    instance: AxiosInstance;
    authStatus: statusType;
    setAuthStatus: React.Dispatch<React.SetStateAction<statusType>>;
};

export const AxiosContext = createContext<authContext>(null!);

const AxiosContextProvider = ({ children }: { children: React.ReactNode }) => {
    // const { accessToken, setCurrentUser } = useContext(AuthContext);
    // const { accessToken } = useSelector((state: RootState) => state.user);
    const [authStatus, setAuthStatus] = useState<statusType>("unauthenticated");
    const instance = axios.create({
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });

    const dispatch = useDispatch();

    instance.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const accessToken = config.headers["authorization"].split(" ")[1];
            // console.log(accessToken);
            if (accessToken === "") {
                // no accessToken was there
                //   getting refreshTOken and if not there then it will return unauthorized
                await axios
                    .get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                        withCredentials: true,
                        headers: { httpOnly: true },
                    })
                    .then((res) => {
                        const newAccessToken = res.data.accessToken;

                        const userData: any = jwtDecode(newAccessToken);

                        config.headers[
                            "authorization"
                        ] = `Bearer ${newAccessToken}`;

                        setAuthStatus("authenticated");
                        // setCurrentUser((prev) => ({
                        //     ...prev,
                        //     accessToken: newAccessToken,
                        // }));
                        dispatch(
                            setUserDetails({
                                _id: userData._id,
                                accessToken: newAccessToken,
                                email: userData.email,
                                premiumSubscriber: userData.premiumSubscriber,
                                username: userData.username,
                            })
                        );
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setAuthStatus("unauthenticated");
                    });
                return config;
            } else {
                const decodedToken: decodeType = jwtDecode(accessToken);
                if (decodedToken.exp * 1000 < currentDate.getTime()) {
                    // token has expired and we get the new accessTOken

                    await axios
                        .get(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
                            withCredentials: true,
                            headers: { httpOnly: true },
                        })
                        .then((res) => {
                            const newAccessToken = res.data.accessToken;
                            config.headers["authorization"] =
                                "Bearer " + newAccessToken;

                            setAuthStatus("authenticated");
                            // setCurrentUser((prev) => ({
                            //     ...prev,
                            //     accessToken: newAccessToken,
                            // }));
                            dispatch(setAccessToken(newAccessToken));
                        })
                        .catch((error) => {
                            console.log(error);
                            setAuthStatus("unauthenticated");
                        });
                }
                return config;
            }
        },
        (error) => {
            setAuthStatus("unauthenticated");
            // setCurrentUser({
            //     _id: "",
            //     username: "",
            //     accessToken: "",
            //     email: "",
            //     premiumSubscriber: false,
            // });
            dispatch(
                setUserDetails({
                    _id: "",
                    username: "",
                    accessToken: "",
                    email: "",
                    premiumSubscriber: false,
                })
            );
            return Promise.reject(error);
        }
    );

    return (
        <AxiosContext.Provider
            value={{
                authStatus: authStatus,
                instance: instance,
                setAuthStatus: setAuthStatus,
            }}
        >
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosContextProvider;
