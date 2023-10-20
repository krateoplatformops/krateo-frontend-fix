import { Button, Card, Tooltip } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./styles.module.scss";
import { PanelProps } from "./types";

const Panel = ({title, tooltip, content, footer}: PanelProps) => {
  return (
    <Card
      className={styles.panel}
      title={title}
      headStyle={{borderBottom: 'none'}}
      bordered={false}
      extra={tooltip ? (
        <Tooltip title={tooltip}>
          <Button type="text" icon={<QuestionCircleOutlined />} />
        </Tooltip>
        ) : undefined
      }
      actions={footer}
    >
      {content}
    </Card>
  )
}

export default Panel;