import { useEffect, useState } from "react"
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";
import Skeleton from "./components/Skeleton/Skeleton";
import Page from "./components/Page/Page"
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Page404 from "./pages/Page404";
import LayoutLogin from "./components/LayoutLogin/LayoutLogin";
import Login from "./Login";
import Profile from "./pages/Profile";

function App() {
  const [router, setRouter] = useState<RouteObject[]>([]);

  const fetchAppData = (clientId) => {
    console.log(clientId);
    
    return (
      {
        routes: [
          {
            label: "Dashboard",
            path: "/",
            icon: "./icons/dashboard.svg",
            menu: true,
          },
          {
            label: "Projects",
            path: "/projects",
            icon: "projects",
            menu: true,
          },
          {
            label: "Projects",
            path: "/projects/:projectId",
            icon: "",
            menu: false,
          },
          {
            label: "Projects",
            path: "/projects/:projectId/create-deployment/:deploymentId",
            icon: "",
            menu: false,
          },
          {
            label: "Projects",
            path: "/projects/:projectId/:deploymentId",
            icon: "",
            menu: false,
          },
          {
            label: "Templates",
            path: "/templates",
            icon: "templates",
            menu: true,
          },
          {
            label: "Providers",
            path: "/providers",
            icon: "providers",
            menu: true,
          },
          {
            label: "Service Status",
            path: "/service-status",
            icon: "status",
            menu: true,
          },
          {
            label: "Organizations",
            path: "/organizations",
            icon: "organizations",
            menu: true,
          },
          {
            label: "Logs",
            path: "/logs",
            icon: "logs",
            menu: true,
          },
          {
            label: "Endpoints",
            path: "/endpoints",
            icon: "endpoints",
            menu: true,
          },
          {
            label: "Licenses",
            path: "/licenses",
            icon: "licenses",
            menu: true,
          }
        ],
        userData: {
          fullname: "Mario Rossi",
          role: "Administrator",
          email: "mario.rossi@acme.com",
          picture: "https://images.nightcafe.studio/jobs/IzqyRMS5p9FDntfbx7AD/IzqyRMS5p9FDntfbx7AD--1--yvojp_15.625x.jpg?tr=w-1600,c-at_max",
        },
        notifications: [
          {
            title: "",
            description: "",
            icon: "",
            new: true,
          }
        ]
      }
    )
  }

  useEffect(() => {
    const clientId = location.host.slice(0, location.host.indexOf("."));
    if (clientId) {
      const result = fetchAppData(clientId);
      createRoutes(clientId, result);
    }
  }, []);

  const createRoutes = (clientId, data) => {
    const routes:RouteObject[] = data.routes.map((r) => (
      {
        path: r.path !== "/" ? r.path : undefined,
        index: r.path === "/",
        element: <Page clientId={clientId} url={r.path} /> 
      }
    ));
    setRouter(
      [
        {
          path: "/login",
          element: <LayoutLogin />,
          children: [
            {
              index: true,
              element: <Login />
            }
          ]
        },
        {
          path: "/",
          element: <Layout
                      menu={data.routes.filter(el => el.menu === true)}
                      user={data.userData}
                      notifications={data.notifications}
                    />,
          errorElement: <ErrorPage />,
          children: [...routes, {
            path: "/profile",
            element: <Profile />
          } ],
        },
        {
          path: "*",
          element: <Page404 />,
        }
      ]
    );
  }

  return (
    <>
    {
      router.length > 0 &&
      <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
    }
    </>
  )
}

export default App
