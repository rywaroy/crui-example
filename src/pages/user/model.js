const initState = () => ({
  listData: [
    {
      id: 1,
      标题1: '测试数据1',
      标题2: '测试数据1',
      标题3: '测试数据1',
      标题4: '测试数据1',
      标题5: '测试数据1',
    },
    {
      id: 2,
      标题1: '测试数据2',
      标题2: '测试数据2',
      标题3: '测试数据2',
      标题4: '测试数据2',
      标题5: '测试数据2',
    },
  ],
  total: 0,
  pageNum: 1,
  pageSize: 10,
  searchFormData: {},
  listFilterVisible: false,
  listFilterModalKey: Math.random(),
});

export default {
  namespace: 'user',
  state: initState(),
  effects: {
    *updateStateCall({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
    *queryList({ payload }, { call, put, select }) {
      // 列表查询
      const user = yield select(state => state.user);
      const { pageNum, pageSize, searchFormData } = user;
      const params = {
        pageNum,
        pageSize,
        ...searchFormData,
        ...payload,
      };
      // const data = yield call(queryListData, params);
      // if (data && data.code === 0) {
      //    yield put({
      //        type: 'updateState',
      //        payload: {
      //            listData: data.data || [],
      //            total: data.count
      //        }
      //    });
      // }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState(state, { payload }) {
      return { ...initState() };
    },
  },
};
