<template>
  <div class="api-original">
    <v-progress-circular
            v-show="modalInfoLoading"
            :size="50"
            color="primary"
            indeterminate
            class="progress-circular"
    ></v-progress-circular>
    <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :loading="apiGeneralTableLoading"
            :pagination.sync="pagination"
            :total-items="totalItems"
            rows-per-page-text=""
            :rows-per-page-items="[ 25, 5, 10 ]"
            no-data-text=""
    >
      <template slot="items" slot-scope="props">
        <is-articles
                :item="props.item"
                ref="isArticles"
        ></is-articles>
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorCode }}</td>
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
        <basket
                :item="props.item"
        ></basket>
      </template>
      <template slot="footer">
        <td colspan="10">
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
  import isArticles from 'components/IsArticles';
  import basket from 'components/Basket';

  export default {
    name: "ApiGeneralTable",
    components: {
      isArticles,
      basket
    },
    props: {
      priceGroup: String,
    },
    data() {
      return {
        headers: [
          {text: 'Инфо', value: 'info', sortable: false},
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorCode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'price'},
          {text: 'Вероятность', value: 'DDPercent'},
          {text: 'Кратность', value: 'LotQuantity'},
          {text: 'Доставка', value: 'deliveryTime'},
          {text: 'Корзина', value: 'Basket'},
        ],
        getDataDetail: [],
        dataDetailTotal: {},
        pagination: {
          sortBy: 'price'
        },
        loading: false,
        totalItems: 0,
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
      async getDataFromApi() {
        let {sortBy, descending, page, rowsPerPage} = this.pagination;
        if (this.priceGroup === 'Original') {
          return;
        }
        await this.$store.dispatch('addGeneralTable', {
              priceGroupName: this.priceGroup,
              pagination: {sortBy, descending, page, rowsPerPage}
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
        setTimeout(() => {

          Object.keys(this.$refs).length && this.$refs.isArticles.isArticles(val);
        }, 0);
      },
    },
    computed: {
      items() {
        this.$store.getters.apiGeneralTableLoading;
        const items = this.$store.getters.priceGroupObj[this.priceGroup].item;
        this.isArticles(items);
        return items;
      },
      total() {

        const total = Object.assign({countApi: 0, minDays: '', minPriceContractor: ''},
            this.$store.getters.priceGroupObj[this.priceGroup].total);
        this.totalItems = this.priceGroup === 'Original' ? 0 : total.countApi;
        return total;
      },
      activeTab() {
        return this.$store.getters.activeTab;
      },
      apiPriceGroup() {
        return this.$store.getters.apiPriceGroup;
      },
      apiGeneralTableLoading() {
        return this.$store.getters.apiGeneralTableLoading;
      },
      apiSummaryLoading() {
        return this.$store.getters.apiSummaryLoading;
      },
      modalInfoLoading() {
        return this.$store.getters.modalInfoLoading;
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

<style lang="scss">

  .progress-circular.v-progress-circular {
    position: fixed;
    bottom: 50vh;
    left: 50vw;
    z-index: 1000;
  }

</style>