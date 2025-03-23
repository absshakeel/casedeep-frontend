import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://casedeep.com:8080/';

export const baseQueryNoAuth = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  mode: 'cors',
  credentials: 'include',
  timeout: 10000
});