import { apiSlice } from "../../api/apiSlice"

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      // query: ({clientID, path}) => `/pageContent/${clientID}/${path}`,
      // it's just a test to get data
      query: ({clientID, path}) => `/apis/widgets.ui.krateo.io/v1alpha1/cardtemplates?sub=cyberjoker&orgs=devs&namespace=dev-system`,
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetPageContentQuery,
 } = pageApiSlice