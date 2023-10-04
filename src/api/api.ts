import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.API_BASEURL }),

  // Endpoints list
  endpoints: (builder) => ({
    getAppData: builder.query({
      query: (clientID) => `/appData/${clientID}`,
    }),
    getAuthModes: builder.query({
      query: (clientID) => `/authModes/${clientID}`,
    }),
    getPageContent: builder.query({
      query: ({clientID, pathname}) => `/pageContent/${clientID}/${pathname}`,
    }),
    getLicenseState: builder.query({
      query: (clientID) => `/license/${clientID}`,
    }),
    updateLicense: builder.mutation({
      query: (body) => ({
        url: `/license/${body.clientID}`,
        method: 'POST',
        body,
      }),
    }),
    getSystemStatus: builder.query({
      query: (clientID) => `/systemStatus/${clientID}`,
    }),
    getLogs: builder.query({
      query: (clientID) => `/logs/${clientID}`,
    }),
    getLogDetails: builder.query({
      query: ({clientID, logID}) => `/logs/${clientID}/${logID}`,
    }),
  }),
})

// Export the auto-generated hook
export const { 
  useGetAppDataQuery,
  useGetAuthModesQuery,
  useGetPageContentQuery,
  useGetLicenseStateQuery,
  useUpdateLicenseMutation,
  useGetSystemStatusQuery,
  useGetLogsQuery,
  useGetLogDetailsQuery
 } = api