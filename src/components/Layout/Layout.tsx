import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1>Master Layout</h1>
      <aside>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/templates">Templates</Link>
          </li>
          <li>
            <Link to="/providers">Providers</Link>
          </li>
          <li>
            <Link to="/servicestatus">Service Status</Link>
          </li>
          <li>
            <Link to="/organizations">Organizations</Link>
          </li>
          <li>
            <Link to="/logs">Logs</Link>
          </li>
          <li>
            <Link to="/endpoints">Endpoints</Link>
          </li>
          <li>
            <Link to="/licenses">Licenses</Link>
          </li>
        </ul>
      </aside>
      <Outlet />
    </div>
  )
}

export default Layout;