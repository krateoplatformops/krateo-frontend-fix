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

    // Temporary hack to show more pages
    if (window.location.pathname.indexOf("/templates") > -1) {
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
                                title: "Templates",
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
                            props: 2,
                            content: [{
                              component: "Widget",
                              element: "ChartBars",
                              props: { 
                                title: "Most used Templates", 
                                tooltip: "Lorem ipsum dolor sit amet",
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                ]
                              }
                            }],
                          },
                          {
                            component: "Col",
                            props: 2,
                            content: [{
                              component: "Widget",
                              element: "ChartBars",
                              props: {
                                title: "Less used Templates", 
                                tooltip: "Lorem ipsum dolor sit amet", 
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "exception"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "exception"
                                  },
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
                            props:  6,
                            content: [{
                              component: "Widget",
                              element: "ChartLine",
                              props: {
                                title: "Templates Trend",
                                tooltip: "this is a beautiful line chart",
                              }
                            }],
                          }
                        ],
                      },
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
                                  badge: true,
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
                                          name: "title",
                                          type: "text",
                                          label: "Title",
                                          rules: [],
                                          placeholder: "type a title",
                                        },
                                        {
                                          name: "content",
                                          type: "text",
                                          label: "Content",
                                          rules: [],
                                          placeholder: "type a text",
                                        },
                                        {
                                          name: "status",
                                          type: "radioGroup",
                                          label: "Status",
                                          rules: [],
                                          placeholder: "",
                                          extra: {
                                            options: [
                                              {
                                                label: "active",
                                                value: "",
                                              },
                                              {
                                                label: "archived",
                                                value: "archived",
                                              },
                                            ]
                                          }
                                        },
                                        {
                                          name: "date",
                                          type: "datetime",
                                          label: "archived date",
                                          rules: [],
                                          placeholder: "",
                                          initialValue: "",
                                          extra: {
                                            format: "DD MMM YYYY",
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
                                  label: "Add Template",
                                  icon: "circle-plus",
                                  type: "primary"
                                },
                                panel: {
                                  title: "Add Template",
                                  description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                                  size: "default",
                                  content: {
                                    element: "FormGenerator",
                                    props: {
                                      title: "Form Name",
                                      description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                                      endpoint: "/createTemplate", // endpoint to call submitting values in POST
                                      prefix: "", // label to connect data list
                                      fields: [
                                        {
                                          name: "endpointType",
                                          type: "select",
                                          label: "Endpoint Type",
                                          required: true,
                                          rules: [],
                                          placeholder: "",
                                          extra: {
                                            options: [
                                              {
                                                label: "lorem ipsum 1",
                                                value: "lorem ipsum 1",
                                              },
                                              {
                                                label: "lorem ipsum 2",
                                                value: "lorem ipsum 2",
                                              },
                                              {
                                                label: "lorem ipsum 3",
                                                value: "lorem ipsum 3",
                                              },
                                            ]
                                          }
                                        },
                                        {
                                          name: "url",
                                          type: "text",
                                          label: "URL",
                                          required: true,
                                          rules: [],
                                          placeholder: "https://",
                                        },
                                        
                                      ]
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
                                    id: 1,
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
                                      id: 2,
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
                                      id: 3,
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

    // projects list
    if (window.location.pathname.match(/^\/projects$/g)) {
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
                                title: "Projects",
                                tooltip: "this is a beautiful pie chart",
                                label: "",
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
                                title: "Projects Trend",
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
                              props: { 
                                title: "Deployments", 
                                tooltip: "Lorem ipsum dolor sit amet",
                                data: [
                                  {
                                    label: "Lorem ipsum 1",
                                    value: "82",
                                    percentage: 23,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 2",
                                    value: "124",
                                    percentage: 68,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 3",
                                    value: "75",
                                    percentage: 16,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 4",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                  {
                                    label: "Lorem ipsum 5",
                                    value: "93",
                                    percentage: 43,
                                    color: "normal"
                                  },
                                ]
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
                                title: "Deployments Trend",
                                tooltip: "this is a beautiful line chart",
                              }
                            }],
                          }
                        ],
                      },
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
                          content:[]
                        },
                        {
                          component:"Widget",
                          element:"DataList",
                          props:{
                              prefix:"ProjectsList", // label to connect filters
                              data:[
                                {
                                  element:"CardTemplate",
                                  props:{
                                    id: 1461651842254,
                                    icon:"server",
                                    color:"blue",
                                    title:"Project #1",
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

    // project details -> deployments list
    if (window.location.pathname.match(/^\/projects\/[0-9]+$/g)) {
      return {
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
                          badge: true,
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
                                  name: "title",
                                  type: "text",
                                  label: "Title",
                                  rules: [],
                                  placeholder: "type a title",
                                },
                                {
                                  name: "content",
                                  type: "text",
                                  label: "Content",
                                  rules: [],
                                  placeholder: "type a text",
                                },
                                {
                                  name: "status",
                                  type: "radioGroup",
                                  label: "Status",
                                  rules: [],
                                  placeholder: "",
                                  extra: {
                                    options: [
                                      {
                                        label: "active",
                                        value: "",
                                      },
                                      {
                                        label: "archived",
                                        value: "archived",
                                      },
                                    ]
                                  }
                                },
                                {
                                  name: "date",
                                  type: "datetime",
                                  label: "archived date",
                                  rules: [],
                                  placeholder: "",
                                  initialValue: "",
                                  extra: {
                                    format: "DD MMM YYYY",
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
                          label: "New Deployment",
                          icon: "circle-plus",
                          type: "primary"
                        },
                        panel: {
                          title: "New Deployment",
                          description: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
                          size: "default",
                          content: {
                            element: "FormGenerator",
                            props: {
                              title: "Form Name",
                              description: "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
                              endpoint: "/createDeployment", // endpoint to call submitting values in POST
                              prefix: "", // label to connect data list
                              fields: [
                              ]
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
                      prefix:"DeploymentList", // label to connect filters
                      data:[
                        {
                          element:"CardTemplate",
                          props:{
                            id: 65461328,
                            icon:"server",
                            color:"blue",
                            title:"Deployment #1",
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
                              id: 2,
                              icon:"fa-code-branch",
                              color:"red",
                              title:"Deployment #2",
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
                              id: 3,
                              icon:"server",
                              color:"blue",
                              title:"Deployment #3",
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
    }

    // deployment details (tabs)
    if (window.location.pathname.match(/^\/projects\/[0-9]+\/[0-9]+$/g)) {
      return {
        component: "Tabs",
        content: [
          {
            component: "TabPane",
            props: {
              label: "Overview"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Relations"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Resources"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Documentation"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Kubernetes"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Pipeline"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Events"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Values"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Terminal"
            },
            content: []
          },
          {
            component: "TabPane",
            props: {
              label: "Keptn"
            },
            content: []
          },
        ]
      }
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