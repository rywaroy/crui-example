import React from 'react';
import { Modal, Form, Input } from 'antd';

const ListModal = props => {
  const { visible, onOk, onCancel, form } = props;
  const { getFieldDecorator } = form;

  const modalSubmit = () => {
    onOk();
  };

  return (
    <Modal
      title={'弹窗标题'}
      visible={visible}
      onCancel={onCancel}
      onOk={modalSubmit}
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
        <Form.Item label={'标签名'}>
          {getFieldDecorator('标签名')(<Input></Input>)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ListModal);
