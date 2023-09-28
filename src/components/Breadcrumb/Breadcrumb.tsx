import { useState, useEffect } from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import styles from "./styles.module.scss";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link, Params, useMatches } from 'react-router-dom';

const Breadcrumb = () => {
  const [items, setItems] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]>();
  const matches = useMatches();

  useEffect(() => {
    const arrMatches: {handle: {crumb: string}, pathname: string, params: Params<string>}[] = matches.filter((m) => m.handle !== undefined).map((m) => ({handle: Object.assign({crumb: ''}, m.handle), pathname: m.pathname, params: m.params} ));
    
    if (arrMatches.length > 0) {
      const items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
      const arrPath = arrMatches[0].pathname.substring(1).split('/');
      
      /**
       * - replace handle.crumb placeholder with params
       * - split handle.crumb to create an array
       * - cicle array to create breadcrumb
       */

      const arrParams = Object.keys(arrMatches[0].params);
      let crumbString = arrMatches[0].handle.crumb;
      arrParams.forEach((el) => {
        crumbString = crumbString.replace(`{${el}}`, arrMatches[0].params[el]!);
      });

      const arrCrumb = crumbString.split('/');
    
      arrCrumb.forEach((el, i) => {
        if (el !== '') {
          if (i === arrCrumb.length-1) {
            items.push({title: el})
          } else {
            items.push({title: <Link to={getFullPath(i, arrPath)}>{el}</Link>})
          }
        }
      });

      setItems(items);
    }
  }, [matches]);

  const getFullPath = (index: number, arr: string[]) => {
    const url: string[] = [];
    arr.forEach((el, i) => {
      if (i <= index) {
        url.push(el);
      }
    })
    return url.join('/');
  }

  return (
    <AntBreadcrumb
      className={styles.breadcrumb}
      items={items}
    />
  )
}

export default Breadcrumb;