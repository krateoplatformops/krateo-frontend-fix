import { ReactElement, useCallback, useEffect, useState } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

import styles from "./styles.module.scss";

type PageType = {
  clientId: string;
  url: string;
}

const Page = ({clientId, url}: PageType) => {
  const [contentPage, setContentPage] = useState(<></>);

  const fetchPage = (clientId: string, url: string) => {
    console.log(clientId, url);

    return {
      component: "Row",
      content: [
        {
          component: "Col",
          props: {flex: 1, width: '100%'},
          content: [
            {
              component: "Row",
              content: [
                {
                  component: "Col",
                  props:  {xs:24, md:8},
                  content: [{
                    component: "Widget",
                    element: "ChartPie",
                    props: {
                      title: "templates",
                      tooltip: "this is a beautiful pie chart",
                      label: "used",
                      value: 428,
                      total: 695,
                      status: "default"
                    }
                  }],
                },
                {
                  component: "Col",
                  props:  {xs:24, md:16},
                  content: [{
                    component: "Widget",
                    element: "ChartLine",
                    props: {
                      title: "trend",
                      tooltip: "this is a beautiful line chart",
                    }
                  }],
                }
              ],
            },
            {
              component: "Row",
              content: [
                {
                  component: "Col",
                  props: {xs:24, md:8},
                  content: [{
                    component: "Widget",
                    element: "Widget1",
                    props: { text: "This is a widget on the side"}
                  }],
                },
                {
                  component: "Col",
                  props:  {xs:24, md:16},
                  content: [{
                    component: "Widget",
                    element: "Widget2",
                    props: { text: "This is a widget on the body"}
                  }],
                }
              ],
            },
            {
              component: "Row",
              content: [
                {
                  component: "Col",
                  props: {xs:24, md:12}, //{flex: '1', md: 24},
                  content: [{
                    component: "Widget",
                    element: "Widget2",
                    props: { text: "This is a widget at 50%"}
                  }],
                },
                {
                  component: "Col",
                  props: {xs:24, md:12}, //{flex: '1', md: 24},
                  content: [{
                    component: "Widget",
                    element: "Widget1",
                    props: { text: "This is a widget at 50%"}
                  }],
                }
              ],
            }
          ]
        }
      ]
    }
  }

  const getContent = useCallback((data, i): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data.component) {
        case "Row":
          return <Row key={`row_${index}`} {...data.props} className={styles.row}>{ getContent(data.content, index+1) }</Row>
          break;
  
        case "Col":
          return <Col key={`col_${index}`} {...data.props} className={styles.col}>{ getContent(data.content, index+1) }</Col>
  
        case "Tabs":
          return <Tabs key={`tabs_${index}`} {...data.props} className={styles.tabs}>{ getContent(data.content, index+1) }</Tabs>
        
        case "TabPane":
          return <TabPane key={`tabpane_${index}`} {...data.props} className={styles.tabpane}>{ getContent(data.content, index+1) }</TabPane>
        
        case "Widget": {
          const Component = widgets[data.element];
          return <Component key={`widget_${index}`} {...data.props} />
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
      return renderComponent(data, i);
    } else {
      return data.map((el, index) => renderComponent(el, index));
    }
  }, []);

  useEffect(() => {
    const createPage = (data) => {
      setContentPage(getContent(data, 1)); // root
    }

    const response = fetchPage(clientId, url);
    createPage(response);
  }, [clientId, getContent, url]);

  return (
    <section className={styles.page}>
      { contentPage }
    </section>
  );
}

export default Page;