export default {
  state: {},
  mutations: {},
  actions: {
    getIdProductFromRedis({dispatch}, payload) {
      console.log(payload);
      dispatch('setParam', {id: payload.id, basket: 'yes', count: payload.count}).then(result => {

          }
      ).catch(error => commit('setErrorMessage', true));
    }
  },
  getters: {}
}
