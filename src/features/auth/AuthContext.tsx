"use client"

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import React from 'react';
import { AuthFields } from '@/types/types';
// import { loginOrRegisterAPI } from './Services/AuthService';
import { MeResponse, UserProfile } from './types/authTypes';
import { loginOrRegisterAPI } from '@/Services/AuthService';


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
        const res = await axios.get<MeResponse>("http://localhost:5000/auth/me", { withCredentials: true });

        const payload: UserProfile = "user" in res.data ? res.data.user : res.data;

        // Normalize + validate at compile time
        const userObj = {
          id: Number(payload?.id),
          email: String(payload?.email ?? ""),
          fullName: String(payload?.fullName ?? ""),
          karma: Number(payload?.karma ?? 0),
        } satisfies UserProfile;

        setUser(userObj);
      } catch (e) {
        console.log(e)
        setUser(null);
      }
      setIsReady(true)
    }
    fetchUser();

  }, []);

  const loginOrRegister = async (initialFields: AuthFields, apiUrl: string) => {
    const data = await loginOrRegisterAPI(initialFields, apiUrl);

    if (!data) {
      setUser(null);
      return;
    }

    const payload: UserProfile = "user" in data ? data.user : data;

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
      value={{ loginOrRegister, user, token, setUser, setToken, logout, isLoggedIn }}
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