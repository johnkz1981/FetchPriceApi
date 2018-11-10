<template>
  <div class="api-original">
    <v-progress-circular
            v-show="lazyLoad"
            :size="50"
            color="primary"
            indeterminate
            class="progress-circular"
    ></v-progress-circular>
    <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :loading="loading"
            :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="props" >
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorСode }}</td>
        <td >{{ props.item.name }}</td>
        <td class="">{{ props.item.quantity }}</td>
        <td class="">{{ props.item.price }}</td>
        <!--td class="">{{ props.item.DDPercent }}</td-->
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
      </template>
      <template slot="footer">
        <td>
          <strong>Количество:</strong>
          {{ total.countApi }}
        </td>
        <td>
          <strong>Доставка:</strong>
          {{ total.minDays}}
        </td>
        <td>
          <strong>Мнимальная цена поставщика:</strong>
          {{ total.minPriceContractor}}
        </td>
        <!--td>
          <strong>Выводимое количество:</strong>
          {{ currentRowCount}}
        </td-->
      </template>

    </v-data-table>
  </div>
</template>

<script>

  export default {
    name: "ApiGeneralTable",
    props: {
      priceGroup: String,
    },
    data() {
      return {
        headers: [
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorСode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'price'},
          {text: 'Вероятность', value: 'DDPercent'},
          {text: 'Кратность', value: 'LotQuantity'},
        ],
        getDataDetail: [],
        dataDetailTotal: {},
        pagination: {
            // rowsPerPage: -1,
          //totalItems: this.total.countApi
        },
        loading: false,
      }
    },
    watch: {
      pagination() {
        // this.getDataFromApi()
        this.pagination.totalItems = 60;
        console.log(this.pagination)
      },
      currentRowCount() {
        return this.$store.getters.priceGroupObj[this.priceGroup].item;
      },
    },
    methods: {
      async getDataFromApi() {
        this.loading = true;
        if (this.pagination) {
          await this.$store.dispatch('getDataDetail', {
            priceGroupName: this.priceGroup,
            sortField: [this.pagination.sortBy, this.pagination.descending],
          });
        }
        const data = this.$store.getters.dataDetail[this.priceGroup];
        this.getDataDetail = data.item;
        this.dataDetailTotal = data.total;
        this.loading = false;
      },
      getIsLazyQuery() {
        return document.documentElement.scrollHeight ===
            document.documentElement.scrollTop +
            document.documentElement.clientHeight &&
            this.apiPriceGroup[this.activeTab] === this.priceGroup;
      }
    },
    computed: {
      items() {
        // this.$store.getters.currentRowCount;
        return this.$store.getters.priceGroupObj[this.priceGroup].item;
      },
      total() {
        return this.$store.getters.priceGroupObj[this.priceGroup].total;
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
      /*currentRowCount() {
        return this.$store.getters.currentRowCount;
      },*/
    },
    created() {
      /*window.addEventListener('scroll', () => {

        if (this.getIsLazyQuery()) {
          this.$store.dispatch('addGeneralTable', {
                priceGroup: this.priceGroup,
              }
          )
        }
      });*/
      if (this.priceGroup !== 'Original') {
        return;
      }
      window.scrollTo({
        'behavior': 'smooth',
        'left': 0,
        'top': document.getElementById('detail').offsetTop
      });
    }
  }
</script>

<style scoped lang="sass">
  .progress-circular
    position: fixed
    bottom: 50vh
    left: 50vw
    z-index: 1000
</style>