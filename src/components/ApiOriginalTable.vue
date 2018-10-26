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
      <td>
        <v-progress-circular
                class="mb-1 mt-1"
                :rotate="360"
                :size="50"
                :width="5"
                :value="+props.item.DDPercent"
                :color="props.item.color"
        >
          {{ parseInt(+props.item.DDPercent) }}
        </v-progress-circular>
      </td>
      <td class="">{{ props.item.LotQuantity }}</td>
    </template>
    <template slot="footer">
      <td>
        <strong>Количество:</strong>
        {{dataDetailTotal.countApi }}
      </td>
      <td>
        <strong>Доставка:</strong>
        {{dataDetailTotal.minDays}}
      </td>
      <td>
        <strong>Мнимальная цена поставщика:</strong>
        {{dataDetailTotal.minPriseContractor}}
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
        dataDetailTotal: {},
      }
    },
    computed: {
      getDataDetail() {
        if (this.$store.getters.dataOriginal !== undefined && this.$store.getters.dataOriginal.length > 0) {
          this.dataDetailTotal = this.$store.getters.dataOriginal.pop();
        }
        return this.$store.getters.dataOriginal;
      },
    },
  }
</script>

<style scoped>

</style>