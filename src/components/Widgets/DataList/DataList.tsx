import { List } from "antd";
import widgets from "../index";
import { useAppDispatch } from "../../../redux/hooks";
import { useEffect } from "react";
import { DataListType, selectDataList, setDataList } from "../../../features/dataList/dataListSlice";
import { useSelector } from "react-redux";

const DataList = ({prefix, data}: {prefix: string, data: DataListType[]}) => {
  const dispatch = useAppDispatch();
  const datalist = useSelector(selectDataList);
  
  // save data on Redux
  useEffect(() => {
    dispatch(setDataList(data))
  }, [data])

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
      dataSource={datalist}
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