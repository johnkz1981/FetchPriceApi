export default {
  state: {
    modalInfo: false,
    modalRow: null,
    objTecDoc: null,
  },
  mutations: {
    setModalInfo(state, payload) {
      state.modalInfo = payload.openModal;
      state.modalRow = payload.row;
    },
    setObjTecDoc(state, payload) {
      state.objTecDoc = payload;
    },
  },
  actions: {
    async setModalInfo({dispatch, commit, state}, payload) {
      const row = Object.assign({vendorСode: '', manufacturer: '', isTecdoc: true}, payload.row);
      if(payload.openModal){
      await dispatch('setParam', row).then(result => {
            commit('setObjTecDoc', result.data);
            commit('setModalInfo', payload);
          }
      ).catch(error => console.log(error));
      } else {
        commit('setObjTecDoc', null);
        commit('setModalInfo', payload);
      }
    },
  },
  getters: {
    modalInfo: state => {
      return state.modalInfo;
    },
    modalRow: state => {
      return state.modalRow;
    },
    objTecDoc: state => {
      return state.objTecDoc;
    },
  }
}