import { ReactNode } from "react";
import { Button, Card, Tooltip } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';

type PanelProps = {
  title: string;
  tooltip?: string;
  content: ReactNode;
  footer?: ReactNode[];
}

const Panel = ({title, tooltip, content, footer}: PanelProps) => {
  return (
    <Card
      title={title}
      bordered={false}
      extra={tooltip ? (
        <Tooltip title={tooltip}>
          <Button type="text" icon={<QuestionCircleOutlined />} />
        </Tooltip>
        ) : undefined
      }
      actions={footer}
      bodyStyle={{padding: 0, width: 'calc(100% - 48px)', margin: '0 auto'}}
    >
      {content}
    </Card>
  )
}

export default Panel;