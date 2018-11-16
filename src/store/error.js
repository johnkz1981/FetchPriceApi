//import error from "error";

export default {
  state: {
    errorMessage: '',
  },
  mutations:{
    setErrorMessage(state, payload) {
      state.errorMessage = payload;
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