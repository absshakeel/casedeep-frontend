import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const certificationApi = createApi({
  reducerPath: 'certificationApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Certification'],
  endpoints: (builder) => ({
    // Create certification order
    createCertification: builder.mutation({
      query: (formData) => ({
        url: 'api/certifications',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['Certification']
    }),

    // Upload identity document
    uploadIdentity: builder.mutation({
      query: ({ cenobase62, formData }) => ({
        url: `api/certifications/${cenobase62}/uploadidentity`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Certification']
    }),

    // Upload deal documents
    uploadDeal: builder.mutation({
      query: ({ cenobase62, formData }) => ({
        url: `api/certifications/${cenobase62}/uploaddeal`,
        method: 'PATCH',
        body: formData
      }),
      invalidatesTags: ['Certification']
    }),

    // Submit certification
    submitCertification: builder.mutation({
      query: (cenobase62) => ({
        url: `api/certifications/${cenobase62}/submit`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Sign certification
    signCertification: builder.mutation({
      query: ({ cenobase62, signname }) => ({
        url: `api/certifications/${cenobase62}/signname/${signname}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Reject certification
    rejectCertification: builder.mutation({
      query: ({ cenobase62, comment }) => ({
        url: `api/certifications/${cenobase62}/reject/${comment}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Process payment
    processCertificationPayment: builder.mutation({
      query: ({ cenobase62, amount }) => ({
        url: `api/certifications/${cenobase62}/payment/${amount}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Set fee code
    setFeeCode: builder.mutation({
      query: ({ cenobase62, code }) => ({
        url: `api/certifications/${cenobase62}/feecode/${code}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Set commission rate
    setCommissionRate: builder.mutation({
      query: ({ cenobase62, rate }) => ({
        url: `api/certifications/${cenobase62}/commissionrate/${rate}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Approve certification
    approveCertification: builder.mutation({
      query: ({ cenobase62, score }) => ({
        url: `api/certifications/${cenobase62}/approve/${score}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Certification']
    }),

    // Get certification by CE number
    getCertification: builder.query({
      query: (cenobase62) => `api/certifications/${cenobase62}`,
      providesTags: ['Certification']
    }),

    // Get submitted certifications
    getSubmittedCertifications: builder.query({
      query: () => 'api/certifications/status/submit',
      providesTags: ['Certification']
    }),

    // Get my certifications
    getMyCertifications: builder.query({
      query: () => 'api/certifications/me',
      providesTags: ['Certification']
    })
  })
});

export const {
  useCreateCertificationMutation,
  useUploadIdentityMutation,
  useUploadDealMutation,
  useSubmitCertificationMutation,
  useSignCertificationMutation,
  useRejectCertificationMutation,
  useProcessCertificationPaymentMutation,
  useSetFeeCodeMutation,
  useSetCommissionRateMutation,
  useApproveCertificationMutation,
  useGetCertificationQuery,
  useGetSubmittedCertificationsQuery,
  useGetMyCertificationsQuery
} = certificationApi;