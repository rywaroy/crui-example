import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './index.less';

interface IProps {
  list: string[];
}

const BreadCrumb: React.FC<IProps> = props => (
  <div className={styles.Breadcrumb}>
    <Breadcrumb>
      {props.list.map(item => (
        <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </div>
);

export default BreadCrumb;
