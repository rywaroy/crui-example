export function listFilters() {
  return [
    {
      type: 'select',
      label: '订单号',
      name: 'select',
      dataOptions: [
        { value: '测试数据1', label: '测试数据1' },
        { value: '测试数据2', label: '测试数据2' },
        { value: '测试数据3', label: '测试数据3' },
      ],
    },
  ];
}
export function outherSet() {
  return [];
}
export function columns(medhods) {
  return [
    { title: '属性1', dataIndex: '属性1' },
    { title: '属性2', dataIndex: '属性2' },
    { title: '属性3', dataIndex: '属性3' },
    { title: '属性4', dataIndex: '属性4' },
    { title: '属性5', dataIndex: '属性5' },
  ];
}
