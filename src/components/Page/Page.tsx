import { ReactElement, useCallback, useEffect, useState } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useGetPageContentQuery } from "../../features/page/pageApiSlice";
import { PageType } from "./type";
import styles from "./styles.module.scss";


const Page = ({clientId, url}: PageType) => {
  const [contentPage, setContentPage] = useState(<></>);
  const {data, isLoading, isError, isSuccess} = useGetPageContentQuery({clientId, url});

  const fetchPage = (clientId: string, url: string) => {
    console.log(clientId, url);
    // template page
    return {
      component: "Row",
      content: [
        {
          component: "Col",
          props: {flex: 1, width: '100%'},
          content: [
            {
              component: "Toolbar",
              content: []
            },
            {
              component: "Widget",
              element: "DataList",
              props: {
                endpoint: "/loremipsum", // per ricevere la lista aggiornata
                data: [
                  {
                    element: "CardTemplate",
                    props: {
                      icon: "server",
                      color: "#11B2E2",
                      title: "Lorem Ipsum dolor sit",
                      status: "",
                      date: "",
                      content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                      tags: [],
                      actions: [
                        {
                          name: "remove",
                          enabled: true,
                          path: "/lorem-ipsum",
                          verb: "DELETE"
                        }
                      ]
                    }
                  },
                  {
                    element: "CardTemplate",
                    props: {
                      icon: "fa-code-branch",
                      color: "#F84C4C",
                      title: "Lorem Ipsum dolor sit",
                      status: "archived",
                      date: "Sep 15th 2023 08:15:43",
                      content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                      tags: ["Lorem ipsum #1", "Lorem ipsum #2"],
                      actions: [
                        {
                          name: "remove",
                          enabled: false,
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ],
        }
      ]
    }

    /*
    // dashboard page
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
                    element: "ChartBars",
                    props: { title: "Most installed Services", tooltip: "Lorem ipsum dolor sit amet", data: []}
                  }],
                },
                {
                  component: "Col",
                  props: {xs:24, md:8},
                  content: [{
                    component: "Widget",
                    element: "ChartBars",
                    props: { title: "Most installed Services", tooltip: "Lorem ipsum dolor sit amet", data: []}
                  }],
                },
                {
                  component: "Col",
                  props: {xs:24, md:8},
                  content: [{
                    component: "Widget",
                    element: "ChartMultipleBars",
                    props: { title: "System Status", tooltip: "Lorem ipsum dolor sit amet", data: []}
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
                    element: "CardTemplate",
                    props: {
                      icon: <ApartmentOutlined />,
                      color: "#11B2E2",
                      title: "Lorem Ipsum dolor sit",
                      status: "",
                      date: "",
                      content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                      tags: [],
                      onDelete: () => {}
                    }
                  }],
                },
                {
                  component: "Col",
                  props: {xs:24, md:12}, //{flex: '1', md: 24},
                  content: [{
                    component: "Widget",
                    element: "CardTemplate",
                    props: {
                      icon: <ApartmentOutlined />,
                      color: "#F84C4C",
                      title: "Lorem Ipsum dolor sit",
                      status: "archived",
                      date: "Sep 15th 2023 08:15:43",
                      content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                      tags: ["Lorem ipsum #1", "Lorem ipsum #2"],
                      onDelete: () => {}
                    }
                  }],
                },
              ],
            },
            {
              component: "Row",
              content: [
                {
                  component: "Col",
                  props: {xs:24, md:16},
                  content: [{
                    component: "Widget",
                    element: "Widget1",
                    props: { text: "This is a widget at 66%"}
                  }],
                },
                {
                  component: "Col",
                  props: {xs:24, md:8},
                  content: [{
                    component: "Widget",
                    element: "ButtonPanelForm",
                    props: {}
                  }],
                }
              ],
            }
          ]
        }
      ]
    }
    */
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
        
        case "Toolbar":
          return <Space style={{width: '100%', justifyContent: 'end'}}></Space>
        
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

  // mock data
  useEffect(() => {
    const createPage = (data) => {
      setContentPage(getContent(data, 1)); // root
    }

    const response = fetchPage(clientId, url);
    createPage(response);
  }, [clientId, getContent, url]);

  // api data
  // useEffect(() => {
  //   const createPage = (data) => {
  //     setContentPage(getContent(data, 1)); // root
  //   }

  //   if (data && isSuccess) {
  //     createPage(data);
  //   }
  // }, [data, getContent, isSuccess]);

  return (
    <section className={styles.page}>
      { contentPage }
    </section>
  );
}

export default Page;