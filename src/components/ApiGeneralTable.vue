<template>
  <div class="api-original">
    <!--v-progress-circular
            v-show="lazyLoad"
            :size="50"
            color="primary"
            indeterminate
            class="progress-circular"
    ></v-progress-circular-->
    <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :loading="lazyLoad"
            :pagination.sync="pagination"
            :total-items="total.countApi"
            rows-per-page-text=""
    >
      <template slot="items" slot-scope="props">
        <td
                class="items__icon"
                @click="openModalInfo(props.item)"
        >
          <v-icon
                  v-if="isArticlesArr[props.item.brandAndCode] === true"
                  color="success"
          >info</v-icon>
          <v-icon
                  v-else-if="isArticlesArr[props.item.brandAndCode] === false"
                  color="error"
          >cancel</v-icon>
          <v-icon
                  v-else
                  color="warning"
          >clock-outline</v-icon>
        </td>
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorСode }}</td>
        <td>{{ props.item.name }}</td>
        <td class="">{{ props.item.quantity }}</td>
        <td class="">{{ props.item.price }}</td>
        <td>
          <v-progress-circular
                  class="mb-1 mt-1"
                  :rotate="360"
                  :size="50"
                  :width="5"
                  :value="+props.item.DDPercent"
                  :color="props.item.color"
          >
            {{ isNaN(+props.item.DDPercent) ? "?" : parseInt(+props.item.DDPercent) }}
          </v-progress-circular>
        </td>
        <td class="">{{ props.item.LotQuantity }}</td>
        <td class="">{{ props.item.deliveryTime }}</td>
      </template>
      <template slot="footer">
        <td colspan="9">
          <strong>Количество:</strong>
          {{ total.countApi }}&#8195;
          <strong>Доставка:</strong>
          {{ total.minDays}}&#8195;
          <strong>Мнимальная цена поставщика:</strong>
          {{ total.minPriceContractor}}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>

  export default {
    name: "ApiGeneralTable",
    components: {
    },
    props: {
      priceGroup: String,
    },
    data() {
      return {
        headers: [
          {text: 'Инфо', value: 'info', sortable: false},
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorСode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'price'},
          {text: 'Вероятность', value: 'DDPercent'},
          {text: 'Кратность', value: 'LotQuantity'},
          {text: 'Доставка', value: 'deliveryTime'},
        ],
        getDataDetail: [],
        dataDetailTotal: {},
        pagination: {},
        loading: false,
      }
    },
    watch: {
      pagination: {
        handler() {
          if (!this.apiSummaryLoading && this.apiPriceGroup[this.activeTab] === this.priceGroup) {
            this.getDataFromApi();
          }
        }
      },
      currentRowCount() {
        return this.$store.getters.priceGroupObj[this.priceGroup].item;
      },
    },
    methods: {
      openModalInfo(row) {
        this.$store.dispatch('setModalInfo', {
          row: row,
          openModal: true
        })
      },
      async getDataFromApi() {

        await this.$store.dispatch('addGeneralTable', {
              priceGroupName: this.priceGroup,
              pagination: this.pagination
            }
        )
      },
      getIsLazyQuery() {
        return document.documentElement.scrollHeight ===
            document.documentElement.scrollTop +
            document.documentElement.clientHeight &&
            this.apiPriceGroup[this.activeTab] === this.priceGroup;
      },
      isArticles(val) {

        if (this.apiPriceGroup[this.activeTab] !== this.priceGroup || this.$store.getters.lazyLoad) {
          return;
        }
        let isArr = -1;
        const brandAndCodeArr = [];

        for (const row of val) {
          isArr = brandAndCodeArr.findIndex(elem => {
            return elem === row.brandAndCode;
          });

          if (isArr === -1) {
            brandAndCodeArr.push(row.brandAndCode);

            this.$store.dispatch('setIsArticlesArr', {
              isArticles: true,
              vendorСode: row.vendorСode,
              manufacturer: row.manufacturer,
              brandAndCode: row.brandAndCode,
              isTecdoc: true
            });
          }
        }
      }
    },
    computed: {
      items() {
        this.$store.getters.lazyLoad
        this.isArticles(this.$store.getters.priceGroupObj[this.priceGroup].item);
        return this.$store.getters.priceGroupObj[this.priceGroup].item;
      },
      total() {
        return Object.assign({countApi: '',minDays: '', minPriceContractor: ''},
            this.$store.getters.priceGroupObj[this.priceGroup].total);
      },
      activeTab() {
        return this.$store.getters.activeTab;
      },
      apiPriceGroup() {
        return this.$store.getters.apiPriceGroup;
      },
      lazyLoad() {
        return this.$store.getters.lazyLoad;
      },
      apiSummaryLoading() {
        return this.$store.getters.apiSummaryLoading;
      },
      isArticlesArr() {
        let obj = {};

        for (const item of this.$store.getters.isArticlesArr) {
          obj = Object.assign(obj, {[item.brandAndCode]: item.isArticles})
        }
        return obj;
      },
    },
    created() {
      if (this.priceGroup !== 'Original') {
        return;
      }
      const options = {
        duration: 300,
        offset: -70,
        easing: 'easeInOutCubic'
      };
      this.$vuetify.goTo('#detail', options);
    }
  }
</script>

<style lang="sass">
  .progress-circular
    position: fixed
    bottom: 50vh
    left: 50vw
    z-index: 1000

  .items__icon
    cursor: pointer
</style>