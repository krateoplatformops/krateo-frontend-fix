import { apiSlice } from "../../api/apiSlice"

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      // query: ({clientID, path}) => `/apis/widgets.ui.krateo.io/v1alpha1/cardtemplates?sub=cyberjoker&orgs=devs&namespace=dev-system`,
      query: ({clientID, path, username, group}) => `/apis/layout.ui.krateo.io/v1alpha1/rows/two?sub=${username}&orgs=${group}&namespace=demo-system`,
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetPageContentQuery,
 } = pageApiSlice