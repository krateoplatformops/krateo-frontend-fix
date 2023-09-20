import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DeploymentOverview from '../DeploymentOverview';
import DeploymentRelations from '../DeploymentRelations';
import DeploymentResources from '../DeploymentResources';
import DeploymentDocumentation from '../DeploymentDocumentation';
import DeploymentKubernetes from '../DeploymentKubernetes';
import DeploymentPipelines from '../DeploymentPipelines';
import DeploymentEvents from '../DeploymentEvents';
import DeploymentValues from '../DeploymentValues';
import DeploymentTerminal from '../DeploymentTerminal';
import DeploymentKeptn from '../DeploymentKeptn';

const Deployment = () => {

  const tabItems: TabsProps['items'] = [
    {
      key: "1",
      label: "overview",
      children: <DeploymentOverview />,
    },
    {
      key: "2",
      label: "relations",
      children: <DeploymentRelations />,
    },
    {
      key: "3",
      label: "resources",
      children: <DeploymentResources />,
    },
    {
      key: "4",
      label: "documentation",
      children: <DeploymentDocumentation />,
    },
    {
      key: "5",
      label: "kubernetes",
      children: <DeploymentKubernetes />,
    },
    {
      key: "6",
      label: "pipeline",
      children: <DeploymentPipelines />,
    },
    {
      key: "7",
      label: "events",
      children: <DeploymentEvents />,
    },
    {
      key: "8",
      label: "values",
      children: <DeploymentValues />,
    },
    {
      key: "9",
      label: "terminal",
      children: <DeploymentTerminal />,
    },
    {
      key: "10",
      label: "keptn",
      children: <DeploymentKeptn />,
    }
  ]
  return (
    <>
      <h1>Deployment</h1>
      
      <Tabs defaultActiveKey="1" items={tabItems} />
    </>
  )
}

export default Deployment;