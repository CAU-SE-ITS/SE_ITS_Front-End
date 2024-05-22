declare namespace User {
  //DTO
  export interface SignInReqDto {
    name: string;
    password: string;
  }

  export interface SignInResDto {
    id: string;
  }

  /* export interface SignInResDto {
    accessToken: string;
    refreshToken: string;
  } */

  //Store
  export interface userStore {
    isSignIn: boolean;
    userId: string;
    signIn: (id: string) => void;
  }
}
