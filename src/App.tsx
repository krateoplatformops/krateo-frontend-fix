import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Skeleton from "./components/Skeleton/Skeleton";
import Login from "./components/Login/Login";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import Providers from "./pages/Providers";
import ServiceStatus from "./pages/ServiceStatus";
import Organizations from "./pages/Organizations";
import Logs from "./pages/Logs";
import Endpoints from "./pages/Endpoints";
import Licenses from "./pages/Licenses";
import Project from "./pages/Project";
import Deployment from "./pages/Deployment";
import CreateDeployment from "./pages/CreateDeployment";

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/projects/:projectId",
          element: <Project />,
        },
        {
          path: "/projects/:projectId/create-deployment/:deploymentId",
          element: <CreateDeployment />,
        },
        {
          path: "/projects/:projectId/:deploymentId",
          element: <Deployment />,
        },
        {
          path: "/templates",
          element: <Templates />
        },
        {
          path: "/providers",
          element: <Providers />
        },
        {
          path: "/servicestatus",
          element: <ServiceStatus />
        },
        {
          path: "/organizations",
          element: <Organizations />
        },
        {
          path: "/logs",
          element: <Logs />
        },
        {
          path: "/endpoints",
          element: <Endpoints />
        },
        {
          path: "/licenses",
          element: <Licenses />
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} fallbackElement={<Skeleton />} />
    </>
  )
}

export default App
