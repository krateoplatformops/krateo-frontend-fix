import { DeleteOutlined } from "@ant-design/icons";
import { Card, Avatar, Button, Space, Typography, Tag } from "antd";
import styles from "./styles.module.scss";

const CardTemplate = ({icon, color, title, status, date, content, tags, actions}) => {
  return (
    <Card
      className={styles.card}
      title={
        <Space size="large" className={styles.header}>
          <Avatar style={{ backgroundColor: color }} size={64} icon={icon} />
          <div className={styles.details}>
            <Typography.Title className={styles.title} level={2}>{title}</Typography.Title>
            <Space className={styles.subTitle}>
              <div className={styles.status} style={{ color: color }}>{status}</div>
              <div className={styles.date}>{date}</div>
            </Space>
          </div>
        </Space>
      }
      actions={[
        <Space wrap key='1'>{tags.map((tag) => <Tag>{tag}</Tag>)}</Space>,
        <Button key='2' onClick={() => {}} icon={<DeleteOutlined />} type="text" disabled={!actions || actions.filter((p) => (p.name === "remove" && p.enabled === true))?.length === 0} />
      ]}
    >
      {content}
    </Card>
  )
}

export default CardTemplate;