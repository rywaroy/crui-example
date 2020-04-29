import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { listFilter, listFilter1, listColumn } from './map';
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
   * 确认listFilter弹窗
   */
  listFilter1ModalSubmit = values => {
    this.listFilter1ModalCancel();
  };

  /**
   * 打开listFilter弹窗
   */
  listFilter1ModalOpen = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        listFilter1ModalKey: Math.random(),
        listFilter1Visible: true,
      },
    });
  };

  /**
   * 关闭listFilter弹窗
   */
  listFilter1ModalCancel = () => {
    this.props.dispatch({
      type: 'user/updateState',
      payload: {
        listFilter1Visible: false,
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
      listFilter1Visible,
      listFilter1ModalKey,
    } = user;
    const pagination = {
      ...Global_Pagination,
      total,
      current: pageNum,
      pageSize,
      onChange: this.onPageChange,
      onShowSizeChange: this.onShowSizeChange,
    };

    const listFilter1ModalProps = {
      modalForm: listFilter1(this),
      modalKey: listFilter1ModalKey,
      visible: listFilter1Visible,
      title: '标题',
      width: 520,
      onCancel: this.listFilter1ModalCancel,
      onOk: this.listFilter1ModalSubmit,
    };
    return (
      <div className="bg-w">
        <SubHeader title="用户">
          <Button type="primary">按钮</Button>
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
            dataSource={user.listData}
            pagination={pagination}
            rowKey={r => r.id}
          />
        </div>
        <GenerateModal {...listFilter1ModalProps} />
      </div>
    );
  }
}

export default connect(({ user }) => ({ user }))(User);
