import { createContext } from 'react';

interface authContextInterface{
  isLoggedIn: boolean;
  userId: null | string;
  token: null | string;
  login: (uid: any, token: any, expirationDate: any) => void;
  logout: (history: any) => void;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token:null,
  login: () => {},
  logout: () => {}
} as authContextInterface);
