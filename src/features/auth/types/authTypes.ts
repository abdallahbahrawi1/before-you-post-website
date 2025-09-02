export type UserProfile = {
  id: number;
  email: string;
  fullName: string;
  karma: number;
}

export type MeResponse = { user: UserProfile } | UserProfile;