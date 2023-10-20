import { apiSlice } from "../../api/apiSlice"

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      query: ({clientID, path}) => `/pageContent/${clientID}/${path}`,
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetPageContentQuery,
 } = pageApiSlice