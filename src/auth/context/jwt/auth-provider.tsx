'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { httpPostLogout, httpPostSignIn, IHttpPostSignInProps } from 'src/services/auth';
import { httpGetUser } from 'src/services/admin/user';
import { IUserItem } from 'src/types/user';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType } from '../../types';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: IUserItem | null;
  };
  [Types.LOGIN]: {
    user: IUserItem | null;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }

  return state;
};

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { data: user } = await httpGetUser();
        dispatch({ type: Types.INITIAL, payload: { user } });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data: IHttpPostSignInProps = { email, password };
    const { data: accessToken } = await httpPostSignIn(data);
    const { data: user } = await httpGetUser();

    setSession(accessToken);
    dispatch({ type: Types.LOGIN, payload: { user } });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await httpPostLogout();

    setSession(null);
    dispatch({ type: Types.LOGOUT });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
