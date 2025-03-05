import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryNoAuth = fetchBaseQuery({
  baseUrl: `http://casedeep.com:8080/`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  mode: 'cors',
  timeout: 10000
});