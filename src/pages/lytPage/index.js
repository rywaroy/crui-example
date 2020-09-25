import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Table, Modal } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { useTable } from '@/hooks';
import ListFilter from '@/components/ListFilter';
import BreadCrumb from '@/components/Breadcrumb';
import { listFilters, outherSet, columns } from './map';
import ListModal from './components/ListModal';
import AddText from './components/AddText';

const LytPage = props => {
  const dispatch = useDispatch();
  const lytPage = useSelector(state => state.lytPage);
  const formRef = useRef(null);
  const [num, setNum] = useState(1);

  const { formData, pageSize, current, modalVisible, modalKey } = lytPage;

  const getData = ({ current, pageSize }, formData) => {
    dispatch({
      type: 'lytPage/updateState',
      payload: {
        formData,
        pageSize,
        current,
      },
    });
    // return getList({
    //     pageNo: current,
    //     pageSize,
    //     ...formData
    // });
    return new Promise(resolve => {
      resolve({
        data: [
          {
            属性1: '测试数据',
            属性2: '测试数据',
            属性3: '测试数据',
            属性4: '测试数据',
            属性5: '测试数据',
            id: 1,
          },
          {
            属性1: '测试数据',
            属性2: '测试数据',
            属性3: '测试数据',
            属性4: '测试数据',
            属性5: '测试数据',
            id: 2,
          },
        ],
        total: 2,
      });
    });
  };

  const { tableProps, search } = useTable(getData, {
    form: formRef.current ? formRef.current.getForm() : false,
    defaultParams: [{ pageSize, current }, formData],
  });

  const { submit, reset } = search;

  const modalCancel = () => {
    dispatch({
      type: 'lytPage/updateState',
      payload: {
        modalVisible: false,
      },
    });
  };

  const modalSubmit = values => {
    modalCancel();
  };

  const modalOpen = () => {
    dispatch({
      type: 'lytPage/updateState',
      payload: {
        modalKey: Math.random(),
        modalVisible: true,
      },
    });
  };

  const add = useCallback(() => {
    console.log(add);
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: 'lytPage/resetState' });
    };
  }, []);

  return (
    <main>
      <PageHeaderLayout>
        <button onClick={() => setNum(num + 1)}>增加</button>
        <AddText add={add} />
        <BreadCrumb list={['首页', '列表']}></BreadCrumb>
        <ListFilter
          ref={formRef}
          onSearch={submit}
          onReset={reset}
          formSet={listFilters()}
        ></ListFilter>
        <Table
          rowKey={'id'}
          {...tableProps}
          bordered={true}
          rowClassName={(record, index) => {
            if (index % 2 === 1) {
              return 'zebra-highlight';
            }
            return '';
          }}
          columns={columns()}
        ></Table>
      </PageHeaderLayout>
      <ListModal
        key={modalKey}
        visible={modalVisible}
        onCancel={modalCancel}
        onOk={modalSubmit}
      />
    </main>
  );
};

export default LytPage;
