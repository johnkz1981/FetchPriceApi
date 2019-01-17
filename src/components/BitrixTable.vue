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
      <is-articles
              :item="props.item"
              ref="isArticles"
      ></is-articles>
      <td class="text-xs-right">{{ props.item.manufacturer }}</td>
      <td class="text-xs-right">{{ props.item.vendorCode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
      <basket
              :item="props.item"
      ></basket>
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
  import basket from 'components/Basket'

  export default {
    name: "BitrixTable",
    components: {
      IsArticles,
      basket
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
    },
    computed: {
      getLoadingBitrix() {
        return this.$store.getters.bitrixLoading;
      },
      getDataBitrix() {
        const items = this.$store.getters.dataBitrix;
        
        if (items) {
          setTimeout(() => {

            Object.keys(this.$refs).length && this.$refs.isArticles && this.$refs.isArticles.isArticles(items.item);
          }, 0);
          return items.item;
        } else {
          return [];
        }
      },
      getDataBitrixTotal() {
        if (this.$store.getters.dataBitrix === undefined) {
          return {minPriceOur: '', countBitix: ''};
        }
        return Object.assign({minPriceOur: '', countBitix: ''}, this.$store.getters.dataBitrix.total);
      },
    }
  }
</script>

<style scoped>

</style>