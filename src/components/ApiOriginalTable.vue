<template>
  <v-data-table
          :headers="headers"
          :items="getDataDetail"
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
        {getDataDetailTotal.countApi }}
      </td>
      <td>
        <strong>Доставка:</strong>
        {getDataDetailTotal.minDays}}
      </td>
      <td>
        <strong>Мнимальная цена поставщика:</strong>
        {getDataDetailTotal.minPriseContractor}}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "ApiOriginalTable",
    props: {
      priceGroup: String,
      items: Array,
      loading: String,
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
    computed : {
      getDataDetail() {
        return this.$store.getters.dataOriginal;
      },
    },
  }
</script>

<style scoped>

</style>