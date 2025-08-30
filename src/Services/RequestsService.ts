import axios from "axios";
import { RequestFormData } from "@/types/types";

export type CreateRequestResponse = {
  requestId: number;
  pointsCharged: number;  // server truth (10)
  balanceAfter: number;   // updated karma
};

export async function createRequest(
  data: RequestFormData,
): Promise<CreateRequestResponse> {
  // Send only what's needed for MVP. Server enforces points logic.
  const payload = {
    title: data.title,
    content: data.content,
    image: data.image,          
    contentType: data.contentType || data.otherContentType || "other",
    tags: data.tags || [],
  };

  const res = await axios.post<CreateRequestResponse>("/api/requests", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
