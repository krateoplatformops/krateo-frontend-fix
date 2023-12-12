import { ReactElement, useCallback, useEffect, useState } from "react";
import widgets from "../Widgets/index";
import { Col, Row, Space, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useGetPageContentQuery } from "../../features/page/pageApiSlice";
import { PageType } from "./type";
import styles from "./styles.module.scss";

// const axiosFetch = async () => {
//   const serverHost = "https://20.31.159.5"
//   const serverUrl = "/apis/widgets.ui.krateo.io/v1alpha1/namespaces/dev-system/cardtemplates";
//   const proxyHost = "https://51.137.0.56:8443";
//   const ca = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURCVENDQWUyZ0F3SUJBZ0lJZHR0bDdtclYvbjB3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TXpFeE1qSXhNREUwTlRoYUZ3MHpNekV4TVRreE1ERTBOVGhhTUJVeApFekFSQmdOVkJBTVRDbXQxWW1WeWJtVjBaWE13Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLCkFvSUJBUURwdEtJbENZS1pkWDZEUlY0NXIvN0lKaEFXQmpGbHEvTUQyUWFFbUIvTXFoamdHK0NLb05mWmNQUG8KQUp0SUFlUUxTc3puZFZ6OENHL1o4QmNFMllZSjBJSGlSbzFSYTkySHR3OW5RSGZTb0YxRkhmbUVyaWhNbnVaRAp1dS84bkhvS2dvVDJFeStXdlhiWUloVDV4NnNhcTJ4VVVrRk03NlZ6d1dkRE9mdlpEY3FBU3ZYanpSMTlYaG5aCkdTOEZSRis4UWo3TTU5STE2QzVwaCtXdUJ0d0lUR2ZKSE5TdWRJRkxkRDViUnhaZ01DWXpQMXVzSnk5eS82a1AKN3EweUFCM09ZZkRhWGpGTFVoSXI4dmpnTURMVFZVSFJnTnBENnNCT2kxdlZnS2w0MVVjYm1SU0VLa2poYmxpYQpjNG10V09NeVJwZE1lSUx0dEVjUHBocTAyM2U5QWdNQkFBR2pXVEJYTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQCkJnTlZIUk1CQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJRbU95ZGpYV3dFTFFJWWZHT3V3cDVDdEkrak96QVYKQmdOVkhSRUVEakFNZ2dwcmRXSmxjbTVsZEdWek1BMEdDU3FHU0liM0RRRUJDd1VBQTRJQkFRQjVPblh5Yzllcgo1L21xbnlheTVLRC9LTnNxRkNRcVFkMHF4RnlJUlZIM2Jad3Fhb3diTzZWNTgydUU3S0sxOEVTbmszRDFjd1hKCkZ5eVdjMm5OZnpyQ2E3MGp4RmZnZ2E0L2pKZ0F4UGVOQy9YZlJWSFVxNXp3S1NveW4wMVBjc2paR2d1eVp2Y3EKYThuQ1M4dDBzbkVHNER2ZnRyVXM1UXNnQnlvM3Q0cEYzUFpuQWU3RWh3RGNxNTBVeDFCM3c4WFNCc3poMFdoNQpoaytxVzVCWFNJSU94TzJpbFpURFAydytPVXBybC9ZdlRkSXZrZTErYlR3UmY3T1hZbTNzK281cndvcEczVFQvClIwNEdtVXNVdFNCNm5qMEIzeFBocjF0NlVSS0c0SWplSVN1Zmd5dENacmxhNkhQY2h6UGRUMU1FdE5QRTR2UXQKWUs2TXgyencrb2lzCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K";
//   const cert = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVBVENDQWVtZ0F3SUJBZ0lRVkRSR3pxdFZ1QzZFNXJZRllWSm0xakFOQmdrcWhraUc5dzBCQVFzRkFEQU4KTVFzd0NRWURWUVFERXdKallUQWVGdzB5TXpFeE1qZ3lNVFEwTWpCYUZ3MHlNekV4TWpreU1UUTBNakJhTUNReApEVEFMQmdOVkJBb1RCR1JsZG5NeEV6QVJCZ05WQkFNVENtTjVZbVZ5YW05clpYSXdnZ0VpTUEwR0NTcUdTSWIzCkRRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRRHVobDhUZWZTZnJRakRvZERNWW1JdGt5b3BIUmxJS284Z0xRMEoKZUhvd1J3cmlQN21VQW4xRWsxb1MxZG9mbUxFNFpMRjkwZ3dUenpkRy8rYy8yQ25UVlU0MEVTODgwKzBwRnVxbgptd0xKUEQ4WUk0dER6MzFBbGlHS3ZEVTBFaWwrd2xOdlRhcndKRG1CckpTWEtPWWNRaEtQNlptRkpoNDBDajZmCkdBM2daTmtKeEQvRDlRbHR6MnU1SDRXb2sxUW5LTERWRE93MkNab0VSM2lFRWw2UWwrMkNua2g3dkZrTGE3RysKQkpqalpxekthd245NmdaQ1AyOWhONVFqRCtHZ2RJZW54Wkkrb2RMcmxLOTNVNXR5R0VZUjd4NVR6dWJEaGZZVwo3TmRkVVE1c29WV3UwZGhpRG9HMmtTY2J5N2NUZzdCUmgyejdoUVZPTWoxQWZPTGpBZ01CQUFHalJqQkVNQk1HCkExVWRKUVFNTUFvR0NDc0dBUVVGQndNQ01Bd0dBMVVkRXdFQi93UUNNQUF3SHdZRFZSMGpCQmd3Rm9BVVBJN2UKWjB6M2RMTEtBSG1Sb0hhVW5rQ0NDOE13RFFZSktvWklodmNOQVFFTEJRQURnZ0lCQUxmN1AwaXV2MGk1ZW5LVwoxRmtiS0RpU2ZpdXh4S0pTRElWSlBTaWtjbzRNOVJZeWt5SzNsQjhzVGNKVkpsakZjTm02UjF4T3REN2QyMytHCjUvZk01ODVHcnZ1TTl6MFZ4TEo2VmVqblQ4SU4zSjd0R1lkL3l1WVZpYTJMamVjRndxQUhVQU91UWJyV25HSm8KcGh6U3hkcmFjWVhuVDd2V2lRU3haakM1S3dwL0JaNm5ablIrM2RNcDB1cVlwZVVhdjNPT1FQRDVPRjBZaXNTYQpjTFg4R21MS2pxdUlUa1JkM04yV1JWdGVURTFJMm1iU3loRzhneHZIT3BEcVc5anNCZFh3MSt4K3RrdFIvK0wzCklSK0doRzBQZmZVR2p4MG43SmxneHg3cnZUWXJ4NjE0SElBOUdiSVJOUGxvaXVoVzNiM1FHdHpzaWFSbVJvV1YKaW5RTVl1dHlzMU1meVZtQkZnSFdYa2dzZ1hVTWVJUDNoS0orbHA4K1R4SlJ6UGdZTmZUQlI0dDZTVkV1RHZ5dQo4Zmx3bHQzaUR1UkN6NlRSaDNzMEtMU1NIYU9pbWs3b0dlbUlGN1lJdXpsY0h2Rk5VdkloWlJuOEFmdVlHRFpDClVWMklwU3JpdktrWmZuV1I5SWNGWHQ3azZOTWo4ano1czFDL25abFFWdmw3QzUzRTViT0h2dlJZdXRUcGdHNEgKWTJiQTVxTEtpeFp5WXowOHdyN2VET1N3MDZwMXYvVCtWcXNxYUNjZWZrUkNjSHFuZndIK3docGFQSGJrZzhXYwphTzFXSWR1d0tSa0cvZmpKRVFiOURQclpoaFdvYlFMR25vK1RDZUJkaDI3QjZMVTZqczJXQXVXMjAvSGwxUmozCnRGQ2YwWmtRbU04bE4zczh1dUlvb09nRG1YbUgKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo";
//   const key = "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcFFJQkFBS0NBUUVBN29aZkUzbjBuNjBJdzZIUXpHSmlMWk1xS1IwWlNDcVBJQzBOQ1hoNk1FY0s0ais1CmxBSjlSSk5hRXRYYUg1aXhPR1N4ZmRJTUU4ODNSdi9uUDlncDAxVk9OQkV2UE5QdEtSYnFwNXNDeVR3L0dDT0wKUTg5OVFKWWhpcncxTkJJcGZzSlRiMDJxOENRNWdheVVseWptSEVJU2orbVpoU1llTkFvK254Z040R1RaQ2NRLwp3L1VKYmM5cnVSK0ZxSk5VSnlpdzFRenNOZ21hQkVkNGhCSmVrSmZ0Z3A1SWU3eFpDMnV4dmdTWTQyYXN5bXNKCi9lb0dRajl2WVRlVUl3L2hvSFNIcDhXU1BxSFM2NVN2ZDFPYmNoaEdFZThlVTg3bXc0WDJGdXpYWFZFT2JLRlYKcnRIWVlnNkJ0cEVuRzh1M0U0T3dVWWRzKzRVRlRqSTlRSHppNHdJREFRQUJBb0lCQUVtYkxidlU1cWhmdlZTaAptczEzanRTQmxZRWFlYkxMYjE5K2g0ZGtwbEEvbkJ3MWpnOGV0WWx6NzFmZ3BtOFpyNWEzZkE1WHcySlpqN1ZaClF3TndzWGVGMjV3MXNWNFVDQnVsOXNQQ0Vob0hmWEQxaHdSbUEwRHJFMjY4cGE1cjdHSXhsWTNEYWZ5eE1RM1QKTkFkeGw1RWcwcG1XZk1tWitiZ1ZjVDJuTHFFUDVXYU9FdThhQU9UT21uUGtFVE9MSE1UamIrVS9od3plRFY2TgpDc3RqOEVTTmdBa2lXd1hMbUJKVFVwdXpQeFJHaXJCZXM4NEthT0kxK3UvbWZKSnJnaGN2cVZKT0RrNysybmJQCndubzhLdHEyQW5ReHdIQWZ0YkhkNTR0cm5ReHRkVjJYMEV6R0lsUDNjOHZmSHRVdU0yRi9RTnFGLzd3VWx0aTAKSGNsSWlBRUNnWUVBOWQxNEZLbFRPVHNQNFdqOEtLY1M0U3IvenhNR2JEc0c2aGU2ZktXZ3NZOVRiRW83Szdtawo4dzI3M2JPL0FwUlBiWm9HQXpXSFBaWkw5QXpISDl4dmtQWjNZcTdPS24zWWhzdUZxNUdQRjY5cXNZQ255NUp4CklUR2Z0a244V1VjUFpwdFRRUlByc0orU3FvNkJMZVhxRVY4WjY2OUd4ei9OQXdZbE85NzkrN1VDZ1lFQStGdHgKaEVEekIwMUpSV3V6Z0ZwQjNPaTJ5OFpKTGdBMk5BU0ZLMXRzRDFQdHcxMDN0OHRTK0Q3Qi9tR3cvcmhXQzNTNwpRSXVtSTZhekhPQXJCODhId0cxbzRvUnExeTdNQTFnN3FEb0p0MUduaWsvT3doKytnaHRmY2xDL1gyY2kyUmh0CjU1WEJHbmVnTXFpaUVOb3NFaEFnYkFEeldsMThvVTJWT2g5ajh6Y0NnWUVBaU9YTzlkb3VQOENXSUJGL3pmYngKT1RUakNONzBCWkY4VVIzek5YSlhubVpLc2hKSERocXBNTGhsOFpVaTl3R3psRGhkdnEyd1p1ZG4xVFRFTHdaagpqSmpmY3JBWWxXcExCUXNQbTY5SnVJdHc0ZkxiK3lySUdRNXplbUdKeEFBZ0lDYStYWThFL2V4c0V0R1VOZ1U5CnBueUloMFdxS0VsckVwTDZhbkxJZ3IwQ2dZRUExNXlMc0lXeWQyUmhlQ05JY3VYb3lDQkFraWhTMzl6UE1kbTYKd3lsYlp2TTJONlYxK2RwSzdibU9NWW9lWHdVcHJraHBTRi8wbkg3Y2dQVWNabXNXRDdqc2xicmdCbkJhTFkwcwpQYUFsVDBGVWNuOVd3TEZPY3lYUWR5NGk5bkJUa0tYa3hHaitmRHZlbUJ4T2x0TFI3OXlRU1RPS0VhbVh5WEhSClcrUmtvWUVDZ1lFQWdZZFkrVWlRcXJidlpwMWhnSHBtRDN0TDZrMjhOSU5PbE9Wb25yWC91ZjAvRC85eDhyODAKQmxYYThGNkN6d1QydjhrZmcvV1ozRFg1MEhMcUE5dWpwcU9xM3RFNEE4SHNiemZkZ0luU3FId21Gc0U3M3Z4NQo0ZkhUU3N5NFhpOU5mVGN0MExhTndUc0QzcmRBUHpoNENkQUJLQ1Rab3dOQjdEWkhaN0U2MHdZPQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo";
  
//   try {
//     const response = await axios.get(`${proxyHost}${serverUrl}`, {
//       baseURL: `${serverHost}${serverUrl}`,
//       proxy: false,
//       httpsAgent: new HttpsProxyAgent({
//         url: proxyHost,
//         ca: ca,
//         cert: cert,
//         key: key,
//         rejectUnauthorized: false,
//       })
//     });
//     console.log(response);
//   } catch(error) {
//     console.log(error);
    
//   }
// }

const Page = ({clientId, url}: PageType) => {
  const [contentPage, setContentPage] = useState(<></>);
  const {data, isLoading, isError, isSuccess} = useGetPageContentQuery({clientId, url});

  const fetchPage = (clientId: string, url: string) => {
    console.log(clientId, url);
    // template page
    return {
      "component":"Row",
      "content":[
         {
            "component":"Col",
            "props":{
               "flex":1,
               "width":"100%"
            },
            "content":[
               {
                  "component":"Toolbar",
                  "content":[
                  ]
               },
               {
                  "component":"Widget",
                  "element":"DataList",
                  "props":{
                     "endpoint":"/loremipsum",
                     "data":[
                        {
                           "element":"CardTemplate",
                           "props":{
                              "icon":"server",
                              "color":"blue",
                              "title":"Lorem Ipsum dolor sit",
                              "status":"",
                              "date":"",
                              "content":"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                              "tags":"",
                              "actions":[
                                 {
                                    "name":"remove",
                                    "enabled":true,
                                    "path":"/lorem-ipsum",
                                    "verb":"DELETE"
                                 }
                              ]
                           }
                        },
                        {
                           "element":"CardTemplate",
                           "props":{
                              "icon":"fa-code-branch",
                              "color":"red",
                              "title":"Lorem Ipsum dolor sit",
                              "status":"archived",
                              "date":"Sep 15th 2023 08:15:43",
                              "content":"<p>lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
                              "tags":"Lorem ipsum #1,Lorem ipsum #2",
                              "actions":[
                                 {
                                    "name":"remove",
                                    "enabled":false
                                 }
                              ]
                           }
                        }
                     ]
                  }
               }
            ]
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