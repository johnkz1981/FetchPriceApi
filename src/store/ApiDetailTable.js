export default {
  state: {

  },
  mutations: {

  },
  actions: {
    async getDataDetail({dispatch, commit, state}, payload) {
      payload.bitrix = 'no';
      payload.group = 'no';
      payload.makeLogo = this.getters.makeLogo;

      await dispatch('setParam', payload).then(result => {
        //`${payload.priceGroupName}` : result.data
        const data ={}
        data[payload.priceGroupName] =  result.data
            commit('setDataDetail', data);
            console.log(result)
          }
      ).catch(error => console.log(error));
    },
  },
  getters: {

  }
}