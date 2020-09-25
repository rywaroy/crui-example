import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// import zhCN from 'antd/lib/locale-provider/zh_CN';

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default BasicLayout;
