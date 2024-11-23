// export interface SignInFields {
//   email: string;
//   password: string;
// }

// export interface SignUpFields {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   termsAccepted: boolean;
// }

// export type AuthFields = SignInFields | SignUpFields;


export interface AuthFields {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  termsAccepted?: boolean;
}
