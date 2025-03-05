import { createContext, useContext } from 'react';
import { useAuthRedux } from '../hooks/useAuthRedux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authState = useAuthRedux();
  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};