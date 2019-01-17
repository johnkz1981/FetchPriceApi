<template>
  <v-data-table
          :headers="headers"
          :items="getDataApi"
          hide-actions
          class="elevation-1"
          :loading="getApiSummaryLoading"
          :pagination.sync="pagination"
          no-data-text=""
  >
    <v-progress-linear slot="progress" indeterminate></v-progress-linear>
    <template slot="headers" slot-scope="props">
      <tr>
        <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['primary', 'white--text' ,'column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
        >
          <v-icon small color="white">arrow_upward</v-icon>
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr
              class="api-summary-table__row"
              :data-brand-and-code="props.item.brandAndCode"
              :data-make-logo="props.item.MakeLogo"
              @click="rowClickSummaryTable">
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorCode }}</td>
        <td>{{ props.item.name }}</td>
        <td class="">{{ props.item.price }}</td>
        <td class="">{{ props.item.priceOriginal }}</td>
        <td class="">{{ props.item.deliveryTime }}</td>
      </tr>
    </template>
    <template slot="footer">
      <div v-show="false">
        <td>
          <strong>Количество:</strong>
        </td>
        <td>
          <strong>Количество уникальных брэндов:</strong>
        </td>
        <td>
          <strong>Доставка:</strong>
        </td>
        <td>
          <strong>Мнимальная цена поставщика:</strong>
        </td>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "ApiSummaryTable",
    props: {},
    data() {
      return {
        headers: [
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorCode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Минимальная цена', value: 'price'},
          {text: 'Исходная цена', value: 'priceOriginal'},
          {text: 'Доставка', value: 'deliveryTime'},
        ],
        pagination: {
          sortBy: 'manufacturer',
          rowsPerPage: -1
        },
      }
    },
    methods: {
      rowClickSummaryTable(event) {
        const dataRow = event.target.parentElement.dataset;

        this.$store.dispatch('getPriceGroup', {
          dataRow: dataRow
        })
      },
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
      getApiSummaryLoading() {
        return this.$store.getters.apiSummaryLoading;
      },
      getDataApi() {
        if (this.$store.getters.dataApi === undefined) {
          return undefined;
        }
        return this.$store.getters.dataApi.item;
      },
      isAdmin(){
        if (this.$store.getters.dataApi === undefined) {
          return undefined;
        }
        return this.$store.getters.dataApi.total.isAdmin;
      }
    }
  }
</script>

<style lang="sass">
  .api-summary-table__row
    cursor: pointer
</style>