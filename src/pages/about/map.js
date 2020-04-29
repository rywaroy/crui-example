export function listFilter(_self) {
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
    { label: 'inputnumber', name: 'inputnumber', type: 'inputnumber' },
  ];
}
