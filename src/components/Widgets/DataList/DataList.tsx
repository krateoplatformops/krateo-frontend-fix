import { List } from "antd";
import widgets from "../index";

const DataList = ({endpoint, data}: {endpoint: string, data: {element: string, props: object }[]}) => {
  // save data on Redux

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => {
        const Component = widgets[item.element];
        return (
          <List.Item>
            <Component {...item.props} />
          </List.Item>
        )
      }}
    />
  )
}

export default DataList;