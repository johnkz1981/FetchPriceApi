export default {
  state: {
    manufacturer: '',
    apiSummaryLoading: false,
    apiPriceGroup: [],
    dataRow: {},
    querySummaryTable: null,
    originalLoadingTable: false,
    bottomPage: false,
    priceGroupObj: {},
    hideDetail: true,
    activeTab: 0,
    currentRowCount: 0,
    lazyLoad: false
  },
  mutations: {
    setManufacturer(state, payload) {
      state.manufacturer = payload.manufacturer
    },
    setApiSummaryLoading(state, payload) {
      state.apiSummaryLoading = payload;
    },
    setApiPriceGroup(state, payload) {
      for (const item of payload) {
        if (state.apiPriceGroup.some(elem => elem === item)) {
          continue;
        }
        state.apiPriceGroup.push(item);
      }
    },
    setApiPriceGroupEmpty(state) {
      state.apiPriceGroup = [];
    },
    setDataRow(state, payload) {
      state.dataRow = payload;
    },
    setQuerySummaryTable(state, payload) {
      state.querySummaryTable = payload;
    },
    setBottomPage(state, payload) {
      state.bottomPage = payload;
    },
    setPriceGroupObj(state, payload) {
      Object.assign(state.priceGroupObj, payload);
    },
    setPriceGroupObjEmpty(state) {
      state.priceGroupObj = {};
    },
    setHideDetail(state, payload) {
      state.hideDetail = payload;
    },
    setActiveTab(state, payload) {
      state.activeTab = payload;
    },
    setlazyRow(state, payload) {
      const priceGroup = state.priceGroupObj[payload.priceGroup];
      if (priceGroup.lazyRow === undefined) {
        Object.assign(priceGroup, {lazyRow: {limit: 0, skipLimit: 0}})
      }
      const lazyRow = Object.assign(priceGroup.lazyRow, payload.lazyRow);
      Object.assign(priceGroup, {lazyRow: lazyRow});
    },
    setPriceGroupObjLazy(state, payload) {
      state.priceGroupObj[payload.priceGroup].item = state.priceGroupObj[payload.priceGroup].item.concat(payload.item);
      state.currentRowCount = state.priceGroupObj[payload.priceGroup].item.length;
    },
    setLazyLoad(state, payload) {
      state.lazyLoad = payload;
    },
    setCurrentRowCountZero(state) {
      state.currentRowCount = 0;
    }
  },
  actions: {

    async getPriceGroup({dispatch, commit, state}, payload) {

      payload.substLevel = 'OriginalOnly';
      payload.makeLogo = payload.dataRow.makeLogo;
      payload.brandAndCode = payload.dataRow.brandAndCode;
      payload.limit = 5;
      payload.skipLimit = 0;

      // commit('setBottomPage', false);
      commit('setCurrentRowCountZero');
      commit('setPriceGroupObjEmpty');
      commit('setApiPriceGroupEmpty');
      commit('setApiSummaryLoading', true);
      commit('setDataRow', payload.dataRow);
      commit('setHideDetail', true);

      const objSummary = {
        brandAndCode: payload.dataRow.brandAndCode,
        makeLogo: payload.makeLogo,
        substLevel: payload.substLevel
      };

      commit('setQuerySummaryTable', objSummary);

      await dispatch('setParam', payload).then(result => {
            commit('setPriceGroupObj', {Original: result.data});
            commit('setApiPriceGroup', ['Original']);
            commit('setHideDetail', false);
          }
      ).catch(error => console.log(error));

      payload.priceGroup = 'yes';
      payload.substLevel = 'All';

      delete payload.brandAndCode;

      dispatch('setParam', payload).then(result => {

            const flatArr = [state.apiPriceGroup, result.data.priceGroupTitle].reduce((acc, val) => acc.concat(val), []);
            commit('setApiPriceGroup', flatArr);
            commit('setApiSummaryLoading', false);
            commit('setPriceGroupObj', result.data.priceGroupObj);
            for (const item of state.apiPriceGroup) {
              if (item === 'Original') {
                continue;
              }
            }
          }
      ).catch(error => console.log(error));
    },
    addGeneralTable({dispatch, commit, state}, payload) {
      if (payload.priceGroupName === 'Original') {
        payload.substLevel = 'OriginalOnly';
      } else {
        payload.substLevel = 'All';
      }
      payload.makeLogo = state.querySummaryTable.makeLogo;
      /*const lazyRow = state.priceGroupObj[payload.priceGroup].lazyRow;
      const countRow = state.priceGroupObj[payload.priceGroup].total.countApi;
      if (lazyRow.skipLimit + lazyRow.limit > countRow) {
        return;
      }
      lazyRow.skipLimit = lazyRow.limit;
      lazyRow.limit += 200;
      commit('setlazyRow', {priceGroup: payload.priceGroup, lazyRow: lazyRow});

      payload.limit = lazyRow.limit;
      payload.skipLimit = lazyRow.skipLimit;
      payload.lazy = 'yes';*/

      const {sortBy, descending, page, rowsPerPage} = payload.pagination;
      //console.log('sortBy:', sortBy, 'descending:', descending, 'page:', page, 'rowsPerPage:', rowsPerPage);
      payload.limit = rowsPerPage;
      payload.skipLimit = (page - 1) * rowsPerPage;
      payload.lazy = 'yes';
      payload.sortField = [sortBy, descending];

      commit('setLazyLoad', true);
      /*dispatch('setParam', payload).then(result => {
            const arrItem = [];
            for (const key in result.data.item) {
              arrItem.push(result.data.item[key]);
            }
            commit('setPriceGroupObjLazy', {item: arrItem, priceGroup: payload.priceGroup});
            commit('setLazyLoad', false);
          }
      ).catch(error => console.log(error));*/
      dispatch('setParam', payload).then(result => {
            const arrItem = [];
            for (const key in result.data.item) {
              arrItem.push(result.data.item[key]);
            }
            commit('setPriceGroupObj', {[payload.priceGroupName]: {item: arrItem}});
            //commit('setPriceGroupObj', result.data);
            commit('setLazyLoad', false);
          }
      ).catch(error => console.log(error));
    }
  },
  getters: {
    apiSummaryLoading: state => {
      return state.apiSummaryLoading;
    },
    apiPriceGroup: state => {
      return state.apiPriceGroup;
    },
    dataRow: state => {
      return state.dataRow;
    },
    limit: state => {
      return state.limit;
    },
    bottomPage: state => {
      return state.bottomPage;
    },
    priceGroupObj: state => {
      return state.priceGroupObj;
    },
    hideDetail: state => {
      return state.hideDetail;
    },
    activeTab: state => {
      return state.activeTab;
    },
    currentRowCount: state => {
      return state.currentRowCount;
    },
    lazyLoad: state => {
      return state.lazyLoad;
    },
  }
}
