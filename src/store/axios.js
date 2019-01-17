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
      let host = '';
      let url = '';

      if (window.location.host === 'localhost:8080') {
        host = 'http://ugautodetal.ru';
      }

      if (payload.isTecdoc) {
        url = `${host}/api/get-tecdoc.php`;

      } else if (payload.isBitrix) {

        url = `${host}/catalog/ajax.php`;

        return axios({
              method: "get",
              url: url,
              params: {
                action: 'ADD2BASKET',
                PRODUCT_ID: payload.id,
                QUANTITY: payload.count
              }
            }
        )
      } else {
        url = `${host}/api/get-api-query.php`;
      }

      const q = {...state, ...payload};

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