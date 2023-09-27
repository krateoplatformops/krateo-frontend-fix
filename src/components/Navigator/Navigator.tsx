import { useEffect, useState } from "react";

type NavType = {
  label: string,
  url: string,
  icon: string,
}
/** TODO:
 * create a dynamic routing system with CreateRoutes
 */
const Navigator = () => {
  const [data, setData] = useState<NavType[]>([]);
  const fetchNavigation = (clientId: string): NavType[] => {
    return [
      {
        label: "dashboard",
        url: "/",
        icon: ""
      },
      {
        label: "projects",
        url: "/projects",
        icon: ""
      },
      {
        label: "templates",
        url: "/templates",
        icon: ""
      },
    ];
  };

  useEffect(() => {
    const response = fetchNavigation('12345');
    setData(response);
  }, []);

  return (
    <ul>
      {
        data.map(item => <li><a href={item.url}>{item.label}</a></li>)
      }
    </ul>
  )
}

export default Navigator;