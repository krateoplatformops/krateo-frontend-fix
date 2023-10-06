import Dashboard from '../assets/icons/dashboard.svg?react';
import Projects from '../assets/icons/projects.svg?react';
import Templates from '../assets/icons/templates.svg?react';
import Providers from '../assets/icons/providers.svg?react';
import Status from '../assets/icons/status.svg?react';
import Organizations from '../assets/icons/organizations.svg?react';
import Logs from '../assets/icons/logs.svg?react';
import Endpoints from '../assets/icons/endpoints.svg?react';
import Licenses from '../assets/icons/licenses.svg?react';

type IconCode = 'dashboard' | 'projects' | 'templates' | 'providers' | 'status' | 'organizations' | 'logs' | 'endpoints' | 'licenses';

export const getIcon = (code: IconCode) => {
  switch (code) {
    case 'dashboard':
      return <Dashboard />
      break;

    case 'projects':
      return <Projects />
      break;

    case 'templates':
      return <Templates />
      break;

    case 'providers':
      return <Providers />
      break;

    case 'status':
      return <Status />
      break;

    case 'organizations':
      return <Organizations />
      break;

    case 'logs':
      return <Logs />
      break;

    case 'endpoints':
      return <Endpoints />
      break;
    
    case 'licenses':
      return <Licenses />
      break;
    default:
      return ''
      break;
  }
}
