export default {
  state: {
    modalInfo: false,
    modalRow: null,
    objTecDoc: null,
    isArticlesArr: []
  },
  mutations: {
    setModalInfo(state, payload) {
      state.modalInfo = payload.openModal;
      state.modalRow = payload.row;
    },
    setObjTecDoc(state, payload) {
      state.objTecDoc = payload;
    },
    setIsArticlesArr(state, payload) {
      state.isArticlesArr.push(payload);
    },
  },
  actions: {
    async setModalInfo({dispatch, commit, state}, payload) {
      const row = Object.assign({vendorСode: '', manufacturer: '', isTecdoc: true}, payload.row);
      if (payload.openModal) {
        await dispatch('setParam', row).then(result => {
              commit('setObjTecDoc', result.data);
              commit('setModalInfo', payload);
            }
        ).catch(error => commit('setErrorMessage', true));
      } else {
        commit('setObjTecDoc', null);
        commit('setModalInfo', payload);
      }
    },
    setIsArticlesArr({dispatch, commit, state}, payload) {
      let isArr = -1;

        isArr = state.isArticlesArr.findIndex((elem) => {
          return elem.brandAndCode === payload.brandAndCode;
        });
        if(isArr !== - 1){
          return;
        }
      dispatch('setParam', payload).then(result => {

            commit('setIsArticlesArr', Object.assign(payload, result.data));
          }
      ).catch(error => commit('setErrorMessage', true));
    }
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
    isArticlesArr: state => {
      return state.isArticlesArr;
    },
  }
}