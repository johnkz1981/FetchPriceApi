<template>
  <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          :loading="loading"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.manufacturer }}</td>
      <td class="text-xs-right">{{ props.item.vendorСode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.quantity }}</td>
      <td class="text-xs-right">{{ props.item.prise }}</td>
    </template>
    <template slot="footer">
      <td>
        <strong>Количество:</strong>
        {{total.countBitix }}
      </td>
      <td>
        <strong>В наличии минимальная цена:</strong>
        {{total.minPriseOur}}
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: "BitrixTable",
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
        ],
      }
    },
  }
</script>

<style scoped>

</style>