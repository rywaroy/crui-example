import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import { Button, Table } from 'antd';
import { useTable } from '@/hooks';
import { SubHeader, ListFilter } from '@/components';
import { listFilters, columns } from './map';

const YlPage = props => {
  const dispatch = useDispatch();
  const ylPage = useSelector(state => state.ylPage);
  const formRef = useRef(null);

  const getData = ({ current, pageSize }, formData) => {
    // return getList({
    //     pageNum: current,
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
            id: 0.3639674386210596,
          },
          {
            属性1: '测试数据',
            属性2: '测试数据',
            属性3: '测试数据',
            属性4: '测试数据',
            属性5: '测试数据',
            id: 0.17128607439966914,
          },
        ],
        total: 2,
      });
    });
  };

  const { tableProps, search } = useTable(getData, {
    form: formRef.current ? formRef.current.getForm() : false,
  });

  const { submit, reset } = search;

  useEffect(() => {
    return () => {
      dispatch({ type: 'ylPage/resetState' });
    };
  }, []);

  return (
    <main>
      <SubHeader title={'油涟标题'}>
        <Button type={'primary'}>导出</Button>
      </SubHeader>
      <div style={{ padding: '20px' }}>
        <ListFilter
          ref={formRef}
          onSearch={submit}
          onReset={reset}
          filters={listFilters()}
        ></ListFilter>
        <Table rowKey={'id'} {...tableProps} columns={columns()}></Table>
      </div>
    </main>
  );
};

export default YlPage;
