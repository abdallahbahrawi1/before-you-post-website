"use client"

import { createContext, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import React from 'react';
import { AuthFields } from '@/types/types';
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
  fetchAndSetUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);
const apiUrl = process.env.NEXT_PUBLIC_API_URL

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const navigate = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  const fetchAndSetUser = useCallback(async () => {
    try {
      const res = await axios.get<MeResponse>(`${apiUrl}/auth/me`, { withCredentials: true });
      const payload: UserProfile = "user" in res.data ? res.data.user : res.data;
      const userObj = {
        id: Number(payload?.id),
        email: String(payload?.email ?? ""),
        fullName: String(payload?.fullName ?? ""),
        karma: Number(payload?.karma ?? 0),
      } satisfies UserProfile;
      setUser(userObj);
    } catch (e) {
      console.log(e);
      setUser(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  const loginOrRegister = async (initialFields: AuthFields, apiUrl: string): Promise<UserProfile | null> => {
    try {
      const data = await loginOrRegisterAPI(initialFields, apiUrl);

      if (!data) {
        throw new Error("No data returned from login/register API");
      }

      const payload: UserProfile = "user" in data ? data.user : data;

      const userObj = {
        id: Number(payload?.id),
        email: String(payload?.email ?? ""),
        fullName: String(payload?.fullName ?? ""),
        karma: Number(payload?.karma ?? 0),
      } satisfies UserProfile;

      setUser(userObj);
      
      return userObj;
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  const isLoggedIn = () => !!user;

  const logout = () => {
    setUser(null);
    navigate.push("/");
  };

  return (
    <UserContext.Provider
      value={{ loginOrRegister, user, token, setUser, setToken, logout, isLoggedIn, fetchAndSetUser }}
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