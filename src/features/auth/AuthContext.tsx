"use client"

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

import React from 'react';
import { AuthFields } from '@/types/types';
import { loginOrRegisterAPI } from './Services/AuthService';

 export type UserProfile = {
  email: string;
  fullName: string;
};

type UserContextType = {
  loginOrRegister: (initialFields: AuthFields, apiUrl: string) => void;
  user: UserProfile | null;
  token: string | null;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token")
    if(user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true)
  }, []);
  
  const loginOrRegister = async (initialFields: AuthFields, apiUrl: string) => {
    await loginOrRegisterAPI(initialFields, apiUrl).then(res => {
      if (res) {
        const userObj: UserProfile = {
            email: res?.data?.email,
            fullName: res?.data?.fullName,
          };
        localStorage.setItem("user", JSON.stringify(res?.data));
        setUser(userObj);
        console.log(res.data)
      }
    })
    .catch((e) => console.log(e));
  }
  
  const isLoggedIn = () => !!user;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate.push("/");
  };
  
  return (
    <UserContext.Provider
      value ={{ loginOrRegister, user, token, setUser, setToken, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);