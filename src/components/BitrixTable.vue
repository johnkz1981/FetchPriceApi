<template>
  <v-data-table
          :headers="headers"
          :items="getDataBitrix"
          hide-actions
          class="elevation-1"
          :loading="getLoadingBitrix"
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
        {{ getDataBitrixTotal.countBitix }}
      </td>
      <td>
        <strong>В наличии минимальная цена:</strong>
        {{ getDataBitrixTotal.minPriseOur}}
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
        headers: [
          {text: 'Производитель', value: 'manufacturer'},
          {text: 'Артикул', value: 'vendorСode'},
          {text: 'Наименование', value: 'name'},
          {text: 'Количество', value: 'quantity'},
          {text: 'Цена', value: 'prise'},
        ],
      }
    },
    computed: {
      getLoadingBitrix() {
        return this.$store.getters.bitrixLoading;
      },
      getDataBitrix() {
        return this.$store.getters.dataBitrix;
      },
      getDataBitrixTotal() {
        const total = {countBitix: '', minPriseOur: ''};
        return !this.$store.getters.dataBitrix ? total : Object.assign(total, this.$store.getters.dataBitrix.pop());
      }
    }
  }
</script>

<style scoped>

</style>