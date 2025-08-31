export interface AuthFields {
  fullName?: string;
  email: string;
  password: string;
  termsAccepted?: boolean;
}

export interface Request {
  id: number;
  userId: number;
  title: string;
  description: string;
  postContent: string;
  contentType: string;
  categories: string[];
  currentPoints: number;
  status: string;
}

export type ContentType =
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'blog'
  | 'other';

export interface RequestFormData {
  title: string;
  postContent: string;
  imageUrl: string | null;
  contentType: ContentType;
  otherContentType?: string;
  tags: string[];
}

export interface HistoryItem {
    id: number;
    title: string;
    metadata: string;
    feedback: string;
}