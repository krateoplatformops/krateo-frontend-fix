import { apiSlice } from "../../api/apiSlice"

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postContent: builder.mutation({
      query: (data) => ({
        url: data.endpoint,
        method: 'POST',
        body: data.body,
      }),
    }),
  }),
})

// Export the auto-generated hook
export const {
  usePostContentMutation,
 } = commonApiSlice