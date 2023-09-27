import { IUserItem } from '../types/user';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: IUserItem | null;
};

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>;
};

export type JWTContextType = CanRemove & {
  user: IUserItem | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
