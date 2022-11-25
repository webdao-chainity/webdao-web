import {createContext} from 'react';
import useAuth from '@/hooks/useAuth';

export interface IAuthContext {
  login: any;
  logout: any;
  account: string | null | undefined;
}

export const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  account: null,
});

export const AuthProvider = (props: any) => {
  const {login, logout, account} = useAuth();
  return (
    <AuthContext.Provider value={{login, logout, account}}>{props.children}</AuthContext.Provider>
  );
};
