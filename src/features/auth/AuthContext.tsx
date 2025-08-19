"use client"

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

import React from 'react';
import { AuthFields } from '@/types/types';
import { loginOrRegisterAPI } from './Services/AuthService';
import axios from 'axios';

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
    console.log(1)
    async function fetchUser() {
      console.log(2)
      try {
        console.log(3)
        const res = await axios.get("http://localhost:5000/auth/me", {withCredentials: true});
        console.log(4)
        console.log(res)
        const data = res.data as { user: UserProfile };
        setUser(data.user);
      } catch (e){
        console.log(e)
        setUser(null);
      }
      setIsReady(true)
    }
    fetchUser();
    // const userString = localStorage.getItem("user");
    // if(userString){
    //   const userObj: UserProfile = JSON.parse(userString);
    //   setUser(userObj);
    // }else {
    //   setUser(null);
    // }

  }, []);
  
  const loginOrRegister = async (initialFields: AuthFields, apiUrl: string) => {
    await loginOrRegisterAPI(initialFields, apiUrl).then(res => {
      if (res) {
        const userObj: UserProfile = {
            email: res?.data?.email,
            fullName: res?.data?.fullName,
          };
        // localStorage.setItem("user", JSON.stringify(res?.data));
        setUser(userObj);
        console.log(res.data)
      }
    })
    .catch((e) => console.log(e));
  }
  
  const isLoggedIn = () => !!user;

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // setUser(null);
    // setToken("");
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