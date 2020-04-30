import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { listFilter, bt1, bt2, czp1, czp2, listColumn } from './map';
import { ListFilter, GenerateModal, SubHeader } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class User extends React.Component {
  searchHandel = searchFormData => {
    this.queryList({ pageNum: 1, searchFormData });
  };

  /**
   * 查询列表
   * @param {Object} params - 查询参数对象
   */
  queryList(params = {}) {
    this.props
      .dispatch({
        type: 'user/updateStateCall',
        payload: { ...params },
      })
      .then(() => {
        this.props.dispatch({ type: 'user/queryList' });
      });
  }

  /**
   * 页码切换
   * @param {Number} page - 页码
   */
  onPageChange = page => {
    this.queryList({ pageNum: page });
  };

  /**
   * 页码变化
   * @param {Number} current - 当前页数
   * @param {Number} size - 分页尺寸
   */
  onShowSizeChange = (current, size) => {
    this.queryList({ pageNum: current, pageSize: size });
  };

  /**
   * 确认bt1弹窗
   */
  bt1ModalSubmit = values => {
    this.bt1ModalCancel();
  };

  /**
   * 打开bt1弹窗
   */
  bt1ModalOpen = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        bt1ModalKey: Math.random(),
        bt1Visible: true,
      },
    });
  };

  /**
   * 关闭bt1弹窗
   */
  bt1ModalCancel = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        bt1Visible: false,
      },
    });
  };

  /**
   * 确认bt2弹窗
   */
  bt2ModalSubmit = values => {
    this.bt2ModalCancel();
  };

  /**
   * 打开bt2弹窗
   */
  bt2ModalOpen = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        bt2ModalKey: Math.random(),
        bt2Visible: true,
      },
    });
  };

  /**
   * 关闭bt2弹窗
   */
  bt2ModalCancel = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        bt2Visible: false,
      },
    });
  };

  /**
   * 确认czp1弹窗
   */
  czp1ModalSubmit = values => {
    this.czp1ModalCancel();
  };

  /**
   * 打开czp1弹窗
   */
  czp1ModalOpen = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        czp1ModalKey: Math.random(),
        czp1Visible: true,
      },
    });
  };

  /**
   * 关闭czp1弹窗
   */
  czp1ModalCancel = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        czp1Visible: false,
      },
    });
  };

  /**
   * 确认czp2弹窗
   */
  czp2ModalSubmit = values => {
    this.czp2ModalCancel();
  };

  /**
   * 打开czp2弹窗
   */
  czp2ModalOpen = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        czp2ModalKey: Math.random(),
        czp2Visible: true,
      },
    });
  };

  /**
   * 关闭czp2弹窗
   */
  czp2ModalCancel = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        czp2Visible: false,
      },
    });
  };

  componentWillUnmount() {
    this.props.dispatch({ type: 'user/resetState' });
  }

  componentDidMount() {
    this.queryList();
  }

  render() {
    const { user } = this.props;
    const {
      total,
      pageNum,
      pageSize,
      listData,
      bt1Visible,
      bt1ModalKey,
      bt2Visible,
      bt2ModalKey,
      czp1Visible,
      czp1ModalKey,
      czp2Visible,
      czp2ModalKey,
    } = user;
    const pagination = {
      ...Global_Pagination,
      total,
      current: pageNum,
      pageSize,
      onChange: this.onPageChange,
      onShowSizeChange: this.onShowSizeChange,
    };

    const bt1ModalProps = {
      modalForm: bt1(this),
      modalKey: bt1ModalKey,
      visible: bt1Visible,
      title: 'bt1',
      width: 520,
      onCancel: this.bt1ModalCancel,
      onOk: this.bt1ModalSubmit,
    };
    const bt2ModalProps = {
      modalForm: bt2(this),
      modalKey: bt2ModalKey,
      visible: bt2Visible,
      title: 'bt2',
      width: 520,
      onCancel: this.bt2ModalCancel,
      onOk: this.bt2ModalSubmit,
    };
    const czp1ModalProps = {
      modalForm: czp1(this),
      modalKey: czp1ModalKey,
      visible: czp1Visible,
      title: '标题',
      width: 520,
      onCancel: this.czp1ModalCancel,
      onOk: this.czp1ModalSubmit,
    };
    const czp2ModalProps = {
      modalForm: czp2(this),
      modalKey: czp2ModalKey,
      visible: czp2Visible,
      title: '标题',
      width: 520,
      onCancel: this.czp2ModalCancel,
      onOk: this.czp2ModalSubmit,
    };
    return (
      <div className="bg-w">
        <SubHeader title="用户">
          <Button type="primary" onClick={this.bt1ModalOpen}>
            按钮1
          </Button>
          <Button type="primary" onClick={this.bt2ModalOpen}>
            按钮2
          </Button>
        </SubHeader>
        <div className="padding20">
          <ListFilter
            filters={listFilter(this)}
            onSearch={this.searchHandel}
            ref={el => (this.listFilter = el)}
          />
          <Table
            className="mt10"
            columns={listColumn(this)}
            dataSource={listData}
            pagination={pagination}
            rowKey={r => r.id}
          />
        </div>
        <GenerateModal {...bt1ModalProps} />
        <GenerateModal {...bt2ModalProps} />
        <GenerateModal {...czp1ModalProps} />
        <GenerateModal {...czp2ModalProps} />
      </div>
    );
  }
}

export default connect(({ user }) => ({ user }))(User);
