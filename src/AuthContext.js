import React, { createContext } from "react";
import axios from 'axios';
import { BASE_URL } from "./Config";
import Signup from "./Signup";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const register = (username, email, password) => {
        axios.post(`${BASE_URL}/register`, {
            username, email, password
        }).then(res => {
            let userInfo = res.data;
        }).catch(e => {
            console.log(`register error: ${e}`);
        });
    };
    return (
        <AuthContext.Provider value={{ register }}>
            {children}
        </AuthContext.Provider>
    );
};
