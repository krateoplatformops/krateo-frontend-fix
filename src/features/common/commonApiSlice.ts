import { apiSlice } from "../../api/apiSlice"

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (data) => ({
        url: data.endpoint,
      }),
    }),
    postContent: builder.mutation({
      query: (data) => ({
        url: data.endpoint,
        method: 'POST',
        body: data.body,
      }),
    }),
    putContent: builder.mutation({
      query: (data) => ({
        url: data.endpoint,
        method: 'PUT',
        body: data.body,
      }),
    }),
    deleteContent: builder.mutation({
      query: (data) => ({
        url: data.endpoint,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetContentQuery,
  useLazyGetContentQuery,
  usePostContentMutation,
  usePutContentMutation,
  useDeleteContentMutation
 } = commonApiSlice