export default {
  state: {
    bitrixLoading: false,
    apiSummaryLoading: false,
    apiGeneralTableLoading: false,
    modalInfoLoading: false
  },
  mutations: {
    setBitrixLoading(state, payload) {
      state.bitrixLoading = payload;
    },
    setApiSummaryLoading(state, payload) {
      state.apiSummaryLoading = payload;
    },
    setApiGeneralTableLoading(state, payload) {
      state.apiGeneralTableLoading = payload;
    },
    setModalInfoLoading(state, payload) {
      state.modalInfoLoading = payload;
    },
  },
  actions: {},
  getters: {
    bitrixLoading: state => {
      return state.bitrixLoading;
    },
    apiSummaryLoading: state => {
      return state.apiSummaryLoading;
    },
    apiGeneralTableLoading: state => {
      return state.apiGeneralTableLoading;
    },
    modalInfoLoading: state => {
      return state.modalInfoLoading;
    },
  }
}