import { MeResponse } from "@/features/auth/types/authTypes";
import { AuthFields } from "@/types/types";
import axios from 'axios';


export const loginOrRegisterAPI = async (initialFields: AuthFields, apiUrl: string): Promise<MeResponse | undefined>  => {
  try {
    const response = await axios.post<MeResponse>(apiUrl, initialFields, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
