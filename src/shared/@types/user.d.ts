declare namespace User {
  //DTO
  export interface SignInReqDto {
    name: string;
    password: string;
  }

  export interface SignInResDto {
    id: number;
    role: Role;
  }

  /* export interface SignInResDto {
    accessToken: string;
    refreshToken: string;
  } */

  //Var
  export type Role = "ADMIN" | "PL" | "DEV" | "TESTER";

  //Store
  export interface userStore {
    isSignIn: boolean;
    userId: number;
    role: Role;
    signIn: (data: SignInResDto) => void;
  }
}
