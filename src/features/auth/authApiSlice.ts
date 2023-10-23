import { apiSlice } from "../../api/apiSlice"
import { AuthModesType, AuthResponseType, LoginFormType } from "../../pages/Login/type"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthModes: builder.query<AuthModesType, string>({
      // query: (clientID) => `/authModes/${clientID}`,
      query: (clientID) => `/`,
    }),
    authentication: builder.query<AuthResponseType, {body: LoginFormType, url: string}>({
      query: (data) => ({
        url: `${data.url}`,
        prepareHeaders: (headers) => (
          headers.set("Authorization", `Basic ${btoa(`${data.body.email}:${data.body.password}`)}`)
        )
      }),
    }),
    socialAuthentication: builder.query<AuthResponseType, {url: string}>({
      query: (data) => `${data.url}`
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
  useLazyAuthenticationQuery,
  useLazySocialAuthenticationQuery,
  // useGetPageContentQuery,
  // useGetLicenseStateQuery,
  // useUpdateLicenseMutation,
  // useGetSystemStatusQuery,
  // useGetLogsQuery,
  // useGetLogDetailsQuery
 } = authApiSlice