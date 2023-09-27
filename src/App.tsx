import Navigator from "./components/Navigator/Navigator"
import Page from "./components/Page/Page"

function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "/projects",
  //         element: <Projects />,
  //       },
  //       {
  //         path: "/projects/:projectId",
  //         element: <Project />,
  //       },
  //       {
  //         path: "/projects/:projectId/create-deployment/:deploymentId",
  //         element: <CreateDeployment />,
  //       },
  //       {
  //         path: "/projects/:projectId/:deploymentId",
  //         element: <Deployment />,
  //       },
  //       {
  //         path: "/templates",
  //         element: <Templates />
  //       },
  //       {
  //         path: "/providers",
  //         element: <Providers />
  //       },
  //       {
  //         path: "/servicestatus",
  //         element: <ServiceStatus />
  //       },
  //       {
  //         path: "/organizations",
  //         element: <Organizations />
  //       },
  //       {
  //         path: "/logs",
  //         element: <Logs />
  //       },
  //       {
  //         path: "/endpoints",
  //         element: <Endpoints />
  //       },
  //       {
  //         path: "/licenses",
  //         element: <Licenses />
  //       }
  //     ]
  //   },
  // ]);

  return (
    <>
      <Navigator />
      <Page />
      {/* <RouterProvider router={router} fallbackElement={<Skeleton />} /> */}
    </>
  )
}

export default App
