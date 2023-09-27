import { ReactElement, useCallback, useEffect, useState } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

import styles from "./styles.module.scss";

const Page = () => {
  const [contentPage, setContentPage] = useState(<></>);

  const fetchPage = (clientId: string, url: string) => {
    return {
      component: "Row",
      content: [
        {
          component: "Col",
          props: {flex: 1},
          content: [{
            component: "Widget",
            element: "Widget1",
            props: { text: "This is a widget on the side"}
          }],
        },
        {
          component: "Col",
          props: {flex: 3},
          content: [{
            component: "Widget",
            element: "Widget2",
            props: { text: "This is a widget on the body"}
          }],
        }
      ]
    }
  }

  const getContent = useCallback((data): ReactElement => {
    const renderComponent = (data) => {
      switch (data.component) {
        case "Row":
          return <Row {...data.props} className={styles.row}>{ getContent(data.content) }</Row>
          break;
  
        case "Col":
          return <Col {...data.props} className={styles.col}>{ getContent(data.content) }</Col>
  
        case "Tabs":
          return <Tabs {...data.props} className={styles.tabs}>{ getContent(data.content) }</Tabs>
        
        case "TabPane":
          return <TabPane {...data.props} className={styles.tabpane}>{ getContent(data.content) }</TabPane>
        
        case "Widget": {
          const Component = widgets[data.element];
          return <Component {...data.props} />
        }
  
        default: // null -> exit recoursive loop
          return <></>
          break;
      }
    }

    // recoursive function to scan page definition json
    // data is the array of elements, root is an object
    if (!data.length) {
      // root element
      return renderComponent(data);
    } else {
      return data.map((el) => renderComponent(el));
    }
  }, []);

  useEffect(() => {
    const createPage = (data) => {
      setContentPage(getContent(data)); // root
    }

    const response = fetchPage('12345', location.pathname);
    createPage(response);
  }, [getContent]);

  return (
    <section className={styles.page}>
      { contentPage }
    </section>
  );
}

export default Page;