declare namespace User {
  //DTO
  export interface SignInReqDto {
    id: string;
    password: string;
  }

  export interface SignInResDto {
    id: number;
    role: Role;
  }

  export type LoadAccountListResDto = {
    id: number;
    role: Role;
  }[];

  /* export interface SignInResDto {
    accessToken: string;
    refreshToken: string;
  } */

  //Var
  export type Role = "ADMIN" | "PL" | "DEV" | "TESTER";

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
