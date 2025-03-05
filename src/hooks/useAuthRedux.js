import { useSelector, useDispatch } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  setToken
} from '../store/slices/authSlice';
import { useGetProfileQuery } from '../store/services/profileApi';

export const useAuthRedux = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !auth.isAuthenticated
  });
  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      // Your login logic here
      dispatch(loginSuccess(credentials));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const updateUser = (user) => {
    dispatch(setUser(user));
  };

  const updateToken = (token) => {
    dispatch(setToken(token));
  };

  return {
    ...auth,
    profile: profileData,
    login,
    handleLogout,
    updateUser,
    updateToken
  };
};