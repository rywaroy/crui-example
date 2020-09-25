import useAntdTable from './useAntdTable';

export default function useTable(servics, options) {
  const table = useAntdTable(servics, {
    formatResult: res => ({
      list: res.data,
      total: Number(res.count),
    }),
    ...options,
  });

  table.tableProps.pagination.showTotal = total => `共 ${total} 条`;
  table.tableProps.pagination.showSizeChanger = true;
  table.tableProps.pagination.showQuickJumper = true;

  return table;
}
