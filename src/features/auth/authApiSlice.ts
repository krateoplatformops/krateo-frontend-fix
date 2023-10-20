import { apiSlice } from "../../api/apiSlice"
import { AuthModesType, AuthResponseType, LoginFormType } from "../../pages/Login/type"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthModes: builder.query<AuthModesType, string>({
      query: (clientID) => `/authModes/${clientID}`,
    }),
    authentication: builder.mutation<AuthResponseType, {body: LoginFormType, url: string}>({
      query: (data) => ({
        url: data.url,
        method: 'POST',
        body: data.body,
      }),
    }),
    // getLicenseState: builder.query({
    //   query: (clientID) => `/license/${clientID}`,
    // }),
    // updateLicense: builder.mutation({
    //   query: (body) => ({
    //     url: `/license/${body.clientID}`,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getSystemStatus: builder.query({
    //   query: (clientID) => `/systemStatus/${clientID}`,
    // }),
    // getLogs: builder.query({
    //   query: (clientID) => `/logs/${clientID}`,
    // }),
    // getLogDetails: builder.query({
    //   query: ({clientID, logID}) => `/logs/${clientID}/${logID}`,
    // }),
  }),
})

// Export the auto-generated hook
export const {
  useGetAuthModesQuery,
  useAuthenticationMutation,
  // useGetPageContentQuery,
  // useGetLicenseStateQuery,
  // useUpdateLicenseMutation,
  // useGetSystemStatusQuery,
  // useGetLogsQuery,
  // useGetLogDetailsQuery
 } = authApiSlice