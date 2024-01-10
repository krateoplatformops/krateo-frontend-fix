import { ReactElement, useCallback, useEffect, useState } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useGetPageContentQuery } from "../../features/page/pageApiSlice";
import { PageType } from "./type";
import styles from "./styles.module.scss";
import Toolbar from "../Toolbar/Toolbar";

const Page = ({clientId, url}: PageType) => {
  const [contentPage, setContentPage] = useState(<></>);
  const {data, isLoading, isError, isSuccess} = useGetPageContentQuery({clientId, url});

  const fetchPage = (clientId: string, url: string) => {
    console.log(clientId, url);

    // dashboard page
    return {
      component: "Tabs",
      content: [
        {
          component: "TabPane",
          props: {
            label: "Charts"
          },
          content: [
            {
              component: "Row",
              content: [
                {
                  component: "Col",
                  props: 5,
                  content: [
                    {
                      component: "Row",
                      content: [
                        {
                          component: "Col",
                          props:  2,
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
                          props:  4,
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
                          props: 2,
                          content: [{
                            component: "Widget",
                            element: "ChartBars",
                            props: { title: "Most installed Services", tooltip: "Lorem ipsum dolor sit amet", data: []}
                          }],
                        },
                        {
                          component: "Col",
                          props: 2,
                          content: [{
                            component: "Widget",
                            element: "ChartBars",
                            props: { title: "Most installed Services", tooltip: "Lorem ipsum dolor sit amet", data: []}
                          }],
                        },
                        {
                          component: "Col",
                          props: 2,
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
                          props: 3,
                          content: [{
                            component: "Widget",
                            element: "CardTemplate",
                            props: {
                              icon: "server",
                              color: "blue",
                              title: "Lorem Ipsum dolor sit",
                              status: "",
                              date: "",
                              content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                              tags: "",
                              actions:[
                                  {
                                    name:"remove",
                                    enabled:false
                                  }
                              ]
                            }
                          }],
                        },
                        {
                          component: "Col",
                          props: 3,
                          content: [{
                            component: "Widget",
                            element: "CardTemplate",
                            props: {
                              icon: "server",
                              color: "blue",
                              title: "Lorem Ipsum dolor sit",
                              status: "archived",
                              date: "Sep 15th 2023 08:15:43",
                              content: <p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>,
                              tags: "Lorem ipsum #1, Lorem ipsum #2",
                              actions:[
                                  {
                                    name:"remove",
                                    enabled:false
                                  }
                              ]
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
                          props: 5,
                          content: [{
                            component: "Widget",
                            element: "Widget1",
                            props: { text: "This is a widget at 66%"}
                          }],
                        },
                      ],
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          component: "TabPane",
          props: {
            label: "Data"
          },
          content: [
            {
              component:"Row",
              content:[
                {
                  component:"Col",
                  props: 5,
                  content:[
                      {
                        component:"Toolbar",
                        content:[
                          {
                            component: "Widget",
                            element: "ButtonPanel",
                            props: {
                              button: {
                                label: "Filters",
                                icon: "filter",
                                badge: "3",
                              },
                              panel: {
                                title: "Filters",
                                description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                                size: "default",
                                content: {
                                  element: "FormGenerator",
                                  props: { // pass the data to render fields
                                    title: "Form Name",
                                    description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                    endpoint: null, // endpoint to call submitting values in POST
                                    prefix: "TemplateList", // label to connect data list
                                    fields: [
                                      {
                                        name: "field1",
                                        type: "text",
                                        label: "lorem ipsum",
                                        required: true,
                                        rules: [
                                          {
                                            pattern: /^[A-Za-z]$/,
                                            message: "Insert a valid value"
                                          },
                                        ],
                                        placeholder: "lorem ipsum",
                                      },
                                      {
                                        name: "field2",
                                        type: "number",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "0,00",
                                        extra: {
                                          addonBefore: "€"
                                        }
                                      },
                                      {
                                        name: "field3",
                                        type: "number",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "",
                                      },
                                      {
                                        name: "field4",
                                        type: "select",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "",
                                        extra: {
                                          options: [
                                            {
                                              label: "lorem ipsum",
                                              value: 0,
                                            },
                                            {
                                              label: "lorem ipsum",
                                              value: 1,
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        name: "field5",
                                        type: "radioGroup",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "",
                                        initialValue: 0,
                                        extra: {
                                          options: [
                                            {
                                              label: "lorem ipsum",
                                              value: 0,
                                            },
                                            {
                                              label: "lorem ipsum",
                                              value: 1,
                                            }
                                          ]
                                        }
                                      },
                                      {
                                        name: "field6",
                                        type: "checkboxGroup",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "",
                                        initialValue: [0,2],
                                        extra: {
                                          options: [
                                            {
                                              label: "lorem ipsum",
                                              value: 0,
                                            },
                                            {
                                              label: "lorem ipsum",
                                              value: 1,
                                            },
                                          ]
                                        }
                                      },
                                      {
                                        name: "field7",
                                        type: "textArea",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "lorem ipsum",
                                        initialValue: "",
                                      },
                                      {
                                        name: "field8",
                                        type: "checkbox",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "",
                                        initialValue: true,
                                      },
                                      {
                                        name: "field9",
                                        type: "datetime",
                                        label: "lorem ipsum",
                                        rules: [],
                                        placeholder: "lorem ipsum",
                                        initialValue: "2023-10-31T10:37Z",
                                        extra: {
                                          format: "DD MMM YYYY",
                                          minDate: "2023-06-01T00:00Z",
                                          maxDate: "2024-12-01T00:00Z",
                                        }
                                      },
                                    ]
                                  }
                                }
                              }
                            }
                          },
                          {
                            component: "Widget",
                            element: "ButtonPanel",
                            props: {
                              button: {
                                label: "New Template",
                                icon: "circle-plus",
                                type: "primary"
                              },
                              panel: {
                                title: "New Template",
                                description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                                size: "default",
                                content: {
                                  element: "FormGenerator",
                                  props: {
                                    title: "Form Name",
                                    description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                    prefix: "", // label to connect data list
                                    fields: []
                                  }
                                }
                              }
                            }
                          }
                        ]
                      },
                      {
                        component:"Widget",
                        element:"DataList",
                        props:{
                            prefix:"TemplateList", // label to connect filters
                            data:[
                              {
                                element:"CardTemplate",
                                props:{
                                  icon:"server",
                                  color:"blue",
                                  title:"Lorem Ipsum dolor sit",
                                  status:"",
                                  date:"",
                                  content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                  tags:"",
                                  actions:[
                                      {
                                        name:"remove",
                                        enabled:true,
                                        path:"/lorem-ipsum",
                                        verb:"DELETE"
                                      }
                                  ]
                                }
                              },
                              {
                                  element:"CardTemplate",
                                  props:{
                                    icon:"fa-code-branch",
                                    color:"red",
                                    title:"Lorem Ipsum dolor sit",
                                    status:"archived",
                                    date:"Sep 15th 2023 08:15:43",
                                    content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                    tags:"Lorem ipsum #1,Lorem ipsum #2",
                                    actions:[
                                        {
                                          name:"remove",
                                          enabled:false
                                        }
                                    ]
                                  }
                              },
                              {
                                element:"CardTemplate",
                                props:{
                                    icon:"server",
                                    color:"blue",
                                    title:"Lorem Ipsum dolor sit",
                                    status:"",
                                    date:"",
                                    content:"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                                    tags:"",
                                    actions:[
                                      {
                                          name:"remove",
                                          enabled:true,
                                          path:"/lorem-ipsum",
                                          verb:"DELETE"
                                      }
                                    ]
                                }
                              },
                            ]
                        }
                      }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }

  const getColProps = (size) => {
    // Col cases: 8-8-8, 6-6-6-6, 12-12, 24, 6-6-12, 8-16
    switch (size) {
      case 1:
        return {xs: 24, md: 6}
    
      case 2:
        return {xs: 24, md: 8}
    
      case 3:
        return {xs: 24, md: 12}
    
      case 4:
        return {xs: 24, md: 16}
    
      default:
        return {xs: 24, md: 24}
    }
  }

  const getContent = useCallback((data, i): ReactElement => {
    const renderComponent = (data, index) => {
      switch (data.component) {
        case "Row":
          return <Row key={`row_${index}`} {...data.props} className={styles.row}>{ getContent(data.content, index+1) }</Row>

        case "Col":
          return <Col key={`col_${index}`} {...getColProps(data.props)} className={styles.col}>{ getContent(data.content, index+1) }</Col>
  
        case "Tabs":
          return <Tabs key={`tabs_${index}`} {...data.props} className={styles.tabs}>{ getContent(data.content, index+1) }</Tabs>
        
        case "TabPane":
          return <TabPane key={`tabpane_${index}`} tab={data.props.label} className={styles.tabpane}>{ getContent(data.content, index+1) }</TabPane>
        
        case "Toolbar":
          return <Toolbar key={`toolbar_${index}`}>{ getContent(data.content, index+1) }</Toolbar>
        
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