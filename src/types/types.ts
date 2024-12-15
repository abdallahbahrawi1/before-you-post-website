export interface AuthFields {
  fullName?: string;
  email: string;
  password: string;
  termsAccepted?: boolean;
}

export interface Request {
  status: string;
  points: number;
  title: string;
  description: string;
  responses: number;
  likes: number;
}
