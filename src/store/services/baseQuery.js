import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `http://casedeep.com:8080/`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
  
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  mode: 'cors',
  timeout: 10000
});