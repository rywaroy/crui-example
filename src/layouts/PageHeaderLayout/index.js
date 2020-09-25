import React, { Component } from 'react';
import styles from './index.less';

class PageHeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={`${styles.layout} lyt`}>{this.props.children}</div>;
  }
}

export default PageHeaderLayout;
