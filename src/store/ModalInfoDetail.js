export default {
  state: {
    modalInfo: false,
  },
  mutations:{
    setModalInfo(state, payload) {
      state.modalInfo = payload;
    },
  },
  actions:{
    setModalInfo({dispatch, commit, state}, payload){
      commit('setModalInfo',payload);
    }
  },
  getters: {
    modalInfo: state => {
      return state.modalInfo;
    },
  }
}