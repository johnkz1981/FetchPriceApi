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
      <td class="text-xs-right">{{ props.item.manufacturer }}</td>
      <td class="text-xs-right">{{ props.item.vendorCode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        В наличии нет :(
      </v-alert>
    </template>
    <template slot="footer" color="red">
      <td>
        <strong>Количество:</strong>
        {{ getDataBitrixTotal.countBitix }}
      </td>
      <td>
        <strong>В наличии минимальная цена:</strong>
        {{ getDataBitrixTotal.minPriceOur}}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "BitrixTable",
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
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorCode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'price'},
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
      }
    }
  }
</script>

<style scoped>

</style>