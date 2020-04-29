export function listFilter(_self) {
  return [
    { label: 'input', name: 'input', type: 'input' },
    { label: 'input', name: 'input', type: 'input' },
    { label: 'input', name: 'input', type: 'input' },
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
          <a href="/" target="_blank" className="mr10">
            操作
          </a>
        </>
      ),
      width: 100,
      fixed: 'right',
    },
  ];
}

export function listFilter1(_self) {
  return [{ label: 'input', name: 'input', type: 'input' }];
}
