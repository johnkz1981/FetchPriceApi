export default {
  state: {
    bitrixLoading: false
  },
  mutations: {
    setBitrixLoading(state, payload) {
      state.bitrixLoading = payload;
    },
  },
  actions: {},
  getters: {
    bitrixLoading: state => {
      return state.bitrixLoading;
    },
  }
}