const initState = () => ({
  formData: {},
  pageSize: 10,
  current: 1,
  modalVisible: false,
  modalKey: Math.random(),
});

export default {
  namespace: 'lytPage',
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
