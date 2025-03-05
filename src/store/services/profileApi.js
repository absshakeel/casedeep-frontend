import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/api/profile',
      transformResponse: (response) => ({
        personProfile: response?.personProfile || null,
        businessProfile: response?.businessProfile || null,
      }),
    }),
    updatePersonalProfile: builder.mutation({
      query: (data) => ({
        url: '/api/profile/personal',
        method: 'PUT',
        body: data,
      }),
    }),
    updateBusinessProfile: builder.mutation({
      query: (data) => ({
        url: '/api/profile/business',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdatePersonalProfileMutation,
  useUpdateBusinessProfileMutation,
} = profileApi;