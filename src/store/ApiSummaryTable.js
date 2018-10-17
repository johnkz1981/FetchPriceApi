export default {
  state: {
    manufacturer:''
  },
  mutations:{
    setManufacturer(state, payload) {
      state.manufacturer = payload.manufacturer
    },
  },
  actions:{},
  getters: {}
}