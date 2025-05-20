import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState("");
    const [showOtherPages, setShowOtherPages] = useState("false");

    return (
        <AuthContext.Provider value={{ username, setUsername,showOtherPages, setShowOtherPages}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

