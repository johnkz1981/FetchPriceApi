<template>
  <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          :loading="loading"
  >
    <template slot="items" slot-scope="props">
      <td class="">{{ props.item.manufacturer }}</td>
      <td class="">{{ props.item.vendorСode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="">{{ props.item.quantity }}</td>
      <td class="">{{ props.item.prise }}</td>
      <td class="">{{ props.item.DDPercent }}</td>
      <td class="">{{ props.item.LotQuantity }}</td>
    </template>
    <template slot="footer">
      <td>
        <strong>Количество:</strong>
        {{total.countApi }}
      </td>
      <td>
        <strong>Количество уникальных брэндов:</strong>
        {{total.countGroupUnique }}
      </td>
      <td>
        <strong>Доставка:</strong>
        {{total.minDays}}
      </td>
      <td>
        <strong>Мнимальная цена поставщика:</strong>
        {{total.minPriseContractor}}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "ApiSummaryTable",
    props: {
      items: Array,
      total: Object,
      loading: Boolean
    },
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
  }
</script>

<style scoped>

</style>