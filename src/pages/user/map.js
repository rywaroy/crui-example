export function listFilter(_self) {
  return [
    { label: '姓名', name: '姓名', type: 'input' },
    {
      label: '性别',
      name: '性别',
      type: 'select',
      selectOptions: [
        { value: '测试数据1', label: '测试数据1' },
        { value: '测试数据2', label: '测试数据2' },
        { value: '测试数据3', label: '测试数据3' },
      ],
    },
  ];
}

export function listColumn(_self) {
  return [
    { title: '标题1', dataIndex: '标题1' },
    { title: '标题2', dataIndex: '标题2' },
    { title: '标题3', dataIndex: '标题3' },
    { title: '标题4', dataIndex: '标题4' },
    { title: '标题5', dataIndex: '标题5' },
    {
      title: '操作',
      dataIndex: 'action',
      render: () => (
        <>
          <span className="opt-link" onClick={_self.czp1ModalOpen}>
            操作1
          </span>
          <span className="opt-link" onClick={_self.czp2ModalOpen}>
            操作2
          </span>
        </>
      ),
      width: 300,
    },
  ];
}

export function bt1(_self) {
  return [
    { label: 'input', name: 'input', type: 'input' },
    {
      label: 'select',
      name: 'select',
      type: 'select',
      selectOptions: [
        { value: '测试数据1', label: '测试数据1' },
        { value: '测试数据2', label: '测试数据2' },
        { value: '测试数据3', label: '测试数据3' },
      ],
    },
  ];
}

export function bt2(_self) {
  return [{ label: 'input', name: 'input', type: 'input' }];
}

export function czp1(_self) {
  return [{ label: 'input', name: 'input', type: 'input' }];
}

export function czp2(_self) {
  return [{ label: 'input', name: 'input', type: 'input' }];
}
