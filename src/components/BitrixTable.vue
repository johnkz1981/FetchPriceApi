<template>
  <v-data-table
          :headers="headers"
          :items="getDataBitrix"
          hide-actions
          class="elevation-1"
          :loading="getLoadingBitrix"
          :pagination.sync="pagination"
  >
    <v-progress-linear slot="progress" color="error" indeterminate></v-progress-linear>
    <template slot="headers" slot-scope="props">
      <tr>
        <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['red', 'white--text' ,'column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
        >
          <v-icon small color="white">arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <IsArticles :item="props.item"></IsArticles>
      <td class="text-xs-right">{{ props.item.manufacturer }}</td>
      <td class="text-xs-right">{{ props.item.vendorCode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
      <td class=""
      >
        <div class="shopping-cart">
          <input
                  type="number"
                  :value="props.item.LotQuantity || 1"
                  :min="props.item.LotQuantity || 1"
                  :max="props.item.quantity"
                  :class="`shopping-cart__input input${props.item.id}`"
          >
          <v-icon
                  color="success"
                  @click="addShoppingCart(props.item)"
          >add_shopping_cart
          </v-icon>
        </div>
      </td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        В наличии нет :(
      </v-alert>
    </template>
    <template slot="footer" color="red">
      <td colspan="10">
        <strong>Количество:</strong>
        {{ getDataBitrixTotal.countBitix }}&#8195;
        <strong>В наличии минимальная цена:</strong>
        {{ getDataBitrixTotal.minPriceOur}}&#8195;
      </td>
    </template>
  </v-data-table>
</template>

<script>
  import IsArticles from 'components/IsArticles'

  export default {
    name: "BitrixTable",
    components: {
      IsArticles
    },
    props: {
      //items: Array,
      //total: Object,
      //loading: Boolean
    },
    data() {
      return {
        pagination: {
          sortBy: 'manufacturer',
          rowsPerPage: -1
        },
        headers: [
          {text: 'Инфо', value: 'info', sortable: false},
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorCode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'price'},
          {text: 'Корзина', value: 'Basket'},
        ],
      }
    },
    methods: {
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
        //this.pagination.rowsPerPage = -1;
      },
      openModalInfo(row, isArticles) {
        if (isArticles === false) {
          return;
        }
        this.$store.dispatch('setModalInfo', {
          row: row,
          openModal: true
        })
      },
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
            vendorCode: row.vendorCode,
            manufacturer: row.manufacturer,
            brandAndCode: row.brandAndCode,
            isTecdoc: true
          });
        }
      }
    },
    computed: {
      getLoadingBitrix() {
        return this.$store.getters.bitrixLoading;
      },
      getDataBitrix() {
        if (this.$store.getters.dataBitrix === undefined) {
          return undefined;
        }
        return this.$store.getters.dataBitrix.item;
      },
      getDataBitrixTotal() {
        if (this.$store.getters.dataBitrix === undefined) {
          return {minPriceOur: '', countBitix: ''};
        }
        return Object.assign({minPriceOur: '', countBitix: ''}, this.$store.getters.dataBitrix.total);
      },
      isArticlesArr() {
        let obj = {};

        for (const item of this.$store.getters.isArticlesArr) {
          obj = Object.assign(obj, {[item.brandAndCode]: item.isArticles})
        }
        return obj;
      },
    }
  }
</script>

<style scoped>

</style>