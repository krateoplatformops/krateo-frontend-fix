import { useEffect, useState } from "react"
import { RouterProvider, createBrowserRouter, RouteObject, Link } from "react-router-dom";
import Skeleton from "./components/Skeleton/Skeleton";
import Page from "./components/Page/Page"
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout/Layout";
import Page404 from "./pages/Page404";
import LayoutLogin from "./components/LayoutLogin/LayoutLogin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { getIcon } from "./utils/icons";
import { useGetAppDataQuery } from "./features/app/appApiSlice";
import { Space, Spin, Typography, message } from "antd";
import catchError from "./utils/catchError";
import getClientIdFromPath from "./utils/getClientIdFromPath";
import AuthGitHub from "./pages/Auth/AuthGitHub";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  const clientId = getClientIdFromPath();
  const [router, setRouter] = useState<RouteObject[]>([]);
  const {data, isLoading, isFetching, isError} = useGetAppDataQuery(clientId);
  const [messageApi, contextHolder] = message.useMessage();
  const messageKey = 'appMessageKey';

  const fetchPageData = (clientId) => {
    console.log(clientId);
    
    return (
      {
        routes: [
          {
            label: "Dashboard",
            path: "/",
            icon: getIcon("dashboard"),
            menu: true,
          },
          {
            label: "Projects",
            path: "/projects",
            icon: getIcon("projects"),
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
            icon: getIcon('templates'),
            menu: true,
          },
          {
            label: "Providers",
            path: "/providers",
            icon: getIcon('providers'),
            menu: true,
          },
          {
            label: "Service Status",
            path: "/service-status",
            icon: getIcon('status'),
            menu: true,
          },
          {
            label: "Organizations",
            path: "/organizations",
            icon: getIcon('organizations'),
            menu: true,
          },
          {
            label: "Logs",
            path: "/logs",
            icon: getIcon('logs'),
            menu: true,
          },
          {
            label: "Endpoints",
            path: "/endpoints",
            icon: getIcon('endpoints'),
            menu: true,
          },
          {
            label: "Licenses",
            path: "/licenses",
            icon: getIcon('licenses'),
            menu: true,
          },
          {
            label: "",
            path: "/test",
            icon: "",
            menu: false,
          }
        ],
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
    if (clientId) {
      // get application data (after logged)
      const result = fetchPageData(clientId);
      createRoutes(clientId, result);
    }
  }, [clientId]);

  useEffect(() => {
    if (isError) {
      // TEMPORARY DISABLED: messageApi.open({key: messageKey, type: 'error', content: catchError('application_data_missing')});
    }
  }, [isError, messageApi]);

  const createRoutes = (clientId, data) => {
    const routes:RouteObject[] = data.routes.map((r) => (
      {
        path: r.path !== "/" ? r.path : undefined,
        index: r.path === "/",
        element: <Page clientId={clientId} url={r.path} />,
        handle: r.handle,
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
          path: "/auth/github",
          element: <AuthGitHub />,
        },
        {
          path: "/",
          element: <Layout
                      menu={data.routes.filter(el => el.menu === true)}
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
    {contextHolder}
    {
      (isLoading || isFetching) ?
        <Space direction="vertical" size="large" style={{width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
          <Spin size="large" />
          <Typography.Text>Krateo loading app data...</Typography.Text>
        </Space>
      : (
        router.length > 0 &&
        <RouterProvider router={createBrowserRouter(router)} fallbackElement={<Skeleton />} />
      )
    }
    </>
  )
}

export default App
