import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => ({
        userId: response.userId,
        token: response.token,
        message: response.message
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'api/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'api/auth/forgetpassword',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'api/auth/resetpassword',
        method: 'POST',
        body: data,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => 'api/auth/me',
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
} = authApi;