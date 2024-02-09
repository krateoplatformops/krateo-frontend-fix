import { Badge, Button, Drawer, Space, Typography } from "antd"
import { useState } from "react";
import widgets from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getColorCode } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { selectFilters } from "../../../features/dataList/dataListSlice";
import dayjs from "dayjs";

type ButtonPanelType = {
  button: {
    label: string,
    icon?: string,
    badge?: string,
    type?: "default" | "text" | "link" | "primary" | "dashed",
  },
  panel: {
    title: string,
    description?: string,
    size?: "default" | "large",
    content: {
      element: string,
      props?: React.ReactElement // panel content
    }
  }
}

const ButtonPanel = ({button, panel}: ButtonPanelType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Component = widgets[panel.content.element];
  const btnComp = <Button type={button.type ? button.type : undefined} icon={button.icon ? <FontAwesomeIcon icon={button.icon as IconProp} /> : undefined} onClick={() => setIsOpen(true)}>{button.label}</Button>
  const filters = useSelector(selectFilters);

  const generateInitialValues = () => {
    const iv = {};
    filters.forEach(f => {
      iv[f.fieldName] = f.fieldType === "datetime" ? dayjs(f.fieldValue as string) : f.fieldValue
    })
    return iv;
  }

  return (
    <>
    { button.badge ?
      <Badge count={filters.length} color={getColorCode("darkBlue")}>
        {btnComp}
      </Badge>
      :
        btnComp
      }
      <Drawer
        title={panel.title}
        size={panel.size}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closable={true}
        destroyOnClose={true}
      >
        <Space direction="vertical" style={{width: '100%'}}>
          <Typography.Paragraph>{panel.description}</Typography.Paragraph>
          <Component {...panel.content.props} initialValues={button.badge ? generateInitialValues() : undefined} onClose={() => setIsOpen(false)} />
        </Space>
      </Drawer>
    </>
  )
}

export default ButtonPanel;