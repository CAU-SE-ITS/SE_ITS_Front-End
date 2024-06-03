declare namespace User {
  //DTO
  export interface SignInReqDto {
    signId: string;
    password: string;
  }

  export type SignInResDto = User;

  export interface SignUpRepDto {
    signId: string;
    name: string;
    password: string;
    role: Role;
  }

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
    name: string;
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
    isAdmin: () => boolean;
    isPl: () => boolean;
    isDev: () => boolean;
    isTester: () => boolean;
  }

  export interface AccountStore {
    accounts: LoadAccountListResDto;
    addAccount: (user: User) => void;
    setAccounts: (accounts: LoadAccountListResDto) => void;
    setAccount: (id: number, role: User.Role) => void;
    deleteAccount: (id: number) => void;
  }
}
