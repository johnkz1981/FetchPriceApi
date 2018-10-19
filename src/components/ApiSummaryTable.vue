<template>
  <v-data-table
          :headers="headers"
          :items="getDataApi"
          hide-actions
          class="elevation-1"
          :loading="getApiSummaryLoading"
  >
    <template slot="items" slot-scope="props">
      <tr
              class="api-summary-table__row"
              :data-brand-and-code="props.item.brandAndCode"
              :data-make-logo="props.item.MakeLogo"
              @click="rowClickSummaryTable">
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorСode }}</td>
        <td>{{ props.item.name }}</td>
        <td class="">{{ props.item.quantity }}</td>
        <td class="">{{ props.item.prise }}</td>
        <td class="">{{ props.item.DDPercent }}</td>
        <td class="">{{ props.item.LotQuantity }}</td>
      </tr>
    </template>
    <template slot="footer">
      <td>
        <strong>Количество:</strong>
        {{getDataApiTotal.countApi }}
      </td>
      <td>
        <strong>Количество уникальных брэндов:</strong>
        {{getDataApiTotal.countGroupUnique }}
      </td>
      <td>
        <strong>Доставка:</strong>
        {{getDataApiTotal.minDays}}
      </td>
      <td>
        <strong>Мнимальная цена поставщика:</strong>
        {{getDataApiTotal.minPriseContractor}}
      </td>
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
          {text: 'Артикул', value: 'vendorСode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'prise'},
          {text: 'Вероятность', value: 'DDPercent'},
          {text: 'Кратность', value: 'LotQuantity'},
        ],
      }
    },
    methods: {
      rowClickSummaryTable() {
        const dataRow = event.target.parentElement.dataset;

        this.$store.dispatch('getPriceGroup', {
          url: 'http://yugavtodetal.ru/api/get-api-query.php',
          bitrix: 'no',
          substLevel: 'All',
          makeLogo: dataRow.makeLogo,
          //brandAndCode: dataRow.brandAndCode,
          priceGroup: 'yes'
        })
      },
    },
    computed: {
      getApiSummaryLoading() {
        return this.$store.getters.apiSummaryLoading;
      },
      getDataApi() {
        return this.$store.getters.dataApi;
      },
      getDataApiTotal() {
        const total = {countApi: '', countGroupUnique: '', minDays: '', minPriseContractor: ''};
        return !this.$store.getters.dataApi ? total : Object.assign(total, this.$store.getters.dataApi.pop());
      }
    }
  }
</script>

<style lang="sass">
  .api-summary-table__row
    cursor: pointer
</style>