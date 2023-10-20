import { apiSlice } from "../../api/apiSlice";

export const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppData: builder.query({
      query: (clientID) => `/appData/${clientID}`,
    }),
  }),
})

// Export the auto-generated hook
export const { 
  useGetAppDataQuery,
 } = appApiSlice