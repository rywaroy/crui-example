const initState = () => ({});

export default {
  namespace: 'ylPage',
  state: initState(),
  effects: {
    *changeState({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    resetState() {
      return { ...initState() };
    },
  },
};
