import { createContext, useState } from "react";
import { UserType } from "../types";

interface AuthType extends UserType {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const userDefaults: UserType = {
    _id: "",
    accessToken: "",
    username: "",
    email: "",
    premiumSubscriber: false,
};
const authDefaults: AuthType = { ...userDefaults, setCurrentUser: () => {} };

export const AuthContext = createContext<AuthType>(authDefaults);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserType>(userDefaults);
    return (
        <AuthContext.Provider value={{ setCurrentUser, ...currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
