import { MeResponse } from "@/features/auth/types/authTypes";
import { AuthFields } from "@/types/types";
import axios, { AxiosError }  from 'axios';

const apiUrl =  process.env.NEXT_PUBLIC_API_URL;

export const loginOrRegisterAPI = async (initialFields: AuthFields, url: string): Promise<MeResponse | undefined>  => {
  try {
    const response = await axios.post<MeResponse>(apiUrl + url, initialFields, { withCredentials: true });
    return response.data;
  } catch (err) {
    let msg = "";
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      const data = axiosError.response?.data as { message?: string; error?: string } | undefined;
      msg = data?.message || data?.error || axiosError.message || msg;
    } else if (err instanceof Error) {
      msg = err.message;
    }
    throw new Error(msg);
  }
};
