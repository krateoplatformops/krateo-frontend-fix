import { useState, useEffect } from 'react';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { Link, Params, useMatches } from 'react-router-dom';
import styles from "./styles.module.scss";

const Breadcrumb = () => {
  const [items, setItems] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]>();
  const matches = useMatches();

  useEffect(() => {
    const path = matches.filter(el => el.pathname !== "/")[0]?.pathname?.replace("/", "");
    
    if (path) {
      const items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
      const arrPath = path.split("/");
      arrPath.forEach((el, i) => {
        if (i === arrPath.length-1) {
          items.push({title: el})
        } else {
          items.push({title: <Link to={getFullPath(i, arrPath)}>{el}</Link>})
        }
      })
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