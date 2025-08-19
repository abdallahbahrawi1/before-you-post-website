import { AuthFields } from "@/types/types";
import axios from 'axios';


export const loginOrRegisterAPI = async (initialFields: AuthFields, apiUrl: string) => {
  try {
    const data = await axios.post(apiUrl , initialFields);
    return data;
  } catch (error) {
    console.error(error);
  }
};
