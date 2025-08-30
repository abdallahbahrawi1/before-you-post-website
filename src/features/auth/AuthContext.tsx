"use client"

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

import React from 'react';
import { AuthFields } from '@/types/types';
import { loginOrRegisterAPI } from './Services/AuthService';
import { UserProfile } from './types/authTypes';


type UserContextType = {
  loginOrRegister: (initialFields: AuthFields, apiUrl: string) => void;
  user: UserProfile | null;
  token: string | null;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const navigate = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        type MeResponse = { user: UserProfile } | UserProfile;

        const res = await axios.get<MeResponse>("http://localhost:5000/auth/me", {withCredentials: true});

        const payload = (res.data as any)?.user ?? res.data;

        // Normalize + validate at compile time
        const userObj = {
          id: Number(payload?.id),
          email: String(payload?.email ?? ""),
          fullName: String(payload?.fullName ?? ""),
          karma: Number(payload?.karma ?? 0),
        } satisfies UserProfile;

        setUser(userObj);
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
    const res = await loginOrRegisterAPI(initialFields, apiUrl);
    
    const payload = (res?.data as any)?.user ?? res?.data;

    const userObj = {
      id: Number(payload?.id),
      email: String(payload?.email ?? ""),
      fullName: String(payload?.fullName ?? ""),
      karma: Number(payload?.karma ?? 0),
    } satisfies UserProfile;

    setUser(userObj);
  };
  
  const isLoggedIn = () => !!user;

  const logout = () => {
    setUser(null);
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

/** Safe consumer */
export const useAuth = () => {
  const ctx = React.useContext(UserContext);
  if (!ctx) throw new Error("useAuth must be used within <UserProvider>");
  return ctx;
};