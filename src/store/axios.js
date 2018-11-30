import axios from "axios";

export default {
  state: {
    searchCode: '',
  },
  mutations: {
    setSearchCode(state, payload) {
      state.searchCode = payload;
    },
  },
  actions: {
    setParam({state}, payload) {
      const url = payload.isTecdoc ? 'http://yugavtodetal.ru/api/get-tecdoc.php' : 'http://yugavtodetal.ru/api/get-api-query.php';
      const q = {
        searchCode: state.searchCode,
        bitrix: payload.bitrix,
        group: payload.group,
        substLevel: payload.substLevel,
        makeLogo: payload.makeLogo,
        brandAndCode: payload.brandAndCode,
        priceGroup: payload.priceGroup,
        priceGroupName: payload.priceGroupName,
        sortField: payload.sortField,
        limit: payload.limit,
        skipLimit: payload.skipLimit,
        lazy: payload.lazy,
        vendorCode: payload.vendorCode,
        manufacturer: payload.manufacturer,
        isArticles: payload.isArticles,
      };

      return axios({
            method: "get",
            url: url,
            params: {
              q: JSON.stringify(q),
            }
          }
      )
    }
  },
  getters: {}
}