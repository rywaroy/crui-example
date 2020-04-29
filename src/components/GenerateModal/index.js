import React from 'react';
import { Modal, Button } from 'antd';
import GenerateForm from '../GenerateForm';
import styles from './index.less';

export default class GenerateModal extends React.Component {
  handelOk = () => {
    this.generateModal.verify((error, values) => {
      if (error) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  };

  /* 取消*/
  handelCancel = () => {
    this.props.onCancel && this.props.onCancel();
  };

  /* 对外暴露Form的实例*/
  getForm = () => {
    return this.generateModal.getForm();
  };

  render() {
    const {
      className,
      modalForm,
      mask = true,
      maskClosable = false,
      visible,
      modalKey,
      onCancel,
      title,
      width = 700,
      hasOkBtn = true,
      okText = '确定',
      hasCancelBtn = true,
      cancelText = '取消',
      okBtnDisabled = false,
      zIndex = 1000,
    } = this.props;
    const modalOpts = {
      title,
      visible,
      width,
      mask,
      maskClosable,
      onCancel,
      zIndex,
      footer: (hasCancelBtn || hasOkBtn) && (
        <div>
          {hasCancelBtn && (
            <Button onClick={this.handelCancel}>{cancelText}</Button>
          )}
          {hasOkBtn && (
            <Button
              onClick={this.handelOk}
              type="primary"
              disabled={okBtnDisabled}
            >
              {okText}
            </Button>
          )}
        </div>
      ),
    };

    /* modal弹窗如果没有设置，默认一行2个*/
    modalForm.forEach(item => {
      if (!item.span) {
        item.span = 12;
      }
    });

    return (
      <Modal
        {...modalOpts}
        key={modalKey}
        className={`${styles.generateModal} ${className}`}
      >
        <GenerateForm
          formSet={modalForm}
          wrappedComponentRef={el => (this.generateModal = el)}
        />
        {this.props.children}
      </Modal>
    );
  }
}
