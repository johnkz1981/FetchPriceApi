export default {
  state: {
    errorMessage: '',
  },
  mutations:{
    async setErrorMessage(state, payload) {
      await setTimeout(() => state.errorMessage = true, 0);
      await setTimeout(() => state.errorMessage = false, 6000);
    },
  },
  actions:{
  },
  getters: {
    errorMessage: state => {
      return state.errorMessage;
    },
  }
}