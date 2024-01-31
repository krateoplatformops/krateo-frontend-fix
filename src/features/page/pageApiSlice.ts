import { apiSlice } from "../../api/apiSlice"
const ls = localStorage.getItem("user");
const username = ls && JSON.parse(ls)?.user.username;
const group = ls && JSON.parse(ls)?.groups[0]

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      // query: ({clientID, path}) => `/apis/widgets.ui.krateo.io/v1alpha1/cardtemplates?sub=cyberjoker&orgs=devs&namespace=dev-system`,
      query: ({clientID, path}) => `/apis/layout.ui.krateo.io/v1alpha1/rows/two?sub=${username}&orgs=${group}&namespace=demo-system`,
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetPageContentQuery,
 } = pageApiSlice