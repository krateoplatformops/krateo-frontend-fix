import { Button, Drawer, Space, Typography } from "antd"
import { useState } from "react";
import widgets from "../index";

type ButtonPanelFormType = {
  button: {
    label: string,
    icon?: string,  
  },
  panel: {
    title: string,
    description?: string,
    size?: "default" | "large",
    content: {
      element: string,
      props?: object // pass the data to render fields
    }
  }
}

const ButtonPanelForm = () => {
  const data: ButtonPanelFormType = {
    button: {
      label: "Form Sample",
      icon: "",  
    },
    panel: {
      title: "This is the Panel Title",
      description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
      size: "default",
      content: {
        element: "FormGenerator",
        props: {} // pass the data to render fields
      }
    }
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Component = widgets[data.panel.content.element];

  return (
    <>
      <Button icon={data.button.icon} onClick={() => setIsOpen(true)}>{data.button.label}</Button>

      <Drawer
        title={data.panel.title}
        size={data.panel.size}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        closable={true}
        destroyOnClose={true}
      >
        <Space direction="vertical" style={{width: '100%'}}>
          <Typography.Paragraph>{data.panel.description}</Typography.Paragraph>
          <Component {...data.panel.content.props} />
        </Space>
      </Drawer>
    </>
  )
}

export default ButtonPanelForm;