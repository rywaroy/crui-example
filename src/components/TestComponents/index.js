import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @title 组件
 * @intro 这是介绍
 * @author zzh
 * @version v1.0.0
 * @url www.url.com
 * @image ![](www.image.com)
 * 文本
 */
class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>test</div>;
  }
}

TestComponent.propTypes = {
  prop1: PropTypes.bool.isRequired, // 这是prop1
  prop2: PropTypes.string, // 这是prop2
};

TestComponent.defaultProps = {
  prop1: true,
};

export default TestComponent;
