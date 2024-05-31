declare namespace User {
  //DTO
  export interface SignInReqDto {
    id: string;
    password: string;
  }

  export type SignInResDto = User;

  export type LoadAccountListResDto = User[];

  /* export interface SignInResDto {
    accessToken: string;
    refreshToken: string;
  } */

  //Var
  export type Role = "ADMIN" | "PL" | "DEV" | "TESTER";

  export interface User {
    name: string;
    id: number;
    role: Role;
  }

  //Form
  export interface AccountCreateForm {
    id: string;
    password: string;
    passwordCheck: string;
    role: Role;
  }

  export interface AccountEditForm {
    role: Role;
  }

  //Store
  export interface UserStore {
    isSignIn: boolean;
    userId: number;
    role: Role;
    signIn: (data: SignInResDto) => void;
  }

  export interface AccountStore {
    accounts: LoadAccountListResDto;
    setAccounts: (account: LoadAccountListResDto) => void;
  }
}
