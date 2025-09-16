import axios from "axios";
import { RequestFormData } from "@/types/types";

export type CreateRequestResponse = {
  requestId: number;
  pointsCharged: number;  // server truth (10)
  balanceAfter: number;   // updated karma
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function createRequest(
  data: RequestFormData,
): Promise<CreateRequestResponse> {
  // Send only what's needed for MVP. Server enforces points logic.
  const payload = {
    title: data.title,
    postContent: data.postContent,
    image: data.imageUrl,
    contentType: data.contentType || data.otherContentType || "other",
    tags: data.tags || [],
  };

  const res = await axios.post<CreateRequestResponse>(`${apiUrl}/api/requests`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true 
  });
  return res.data;
}

