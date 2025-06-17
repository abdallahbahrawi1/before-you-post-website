export interface AuthFields {
  fullName?: string;
  email: string;
  password: string;
  termsAccepted?: boolean;
}

export interface Request {
  id: number;
  status: string;
  points: number;
  title: string;
  description: string;
  responses: number;
  likes: number;
}

export type ContentType =
  | ''          
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'blog'
  | 'other';

export interface RequestFormData {
  title: string;
  content: string;
  image: string | null;
  
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