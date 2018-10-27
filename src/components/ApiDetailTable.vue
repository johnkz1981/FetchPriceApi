<template>
  <v-data-table
          :headers="headers"
          :items="getDataDetail"
          hide-actions
          class="elevation-1"
          :loading="loading"
          :pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <td class="">{{ props.item.manufacturer }}</td>
      <td class="">{{ props.item.vendorСode }}</td>
      <td>{{ props.item.name }}</td>
      <td class="">{{ props.item.quantity }}</td>
      <td class="">{{ props.item.prise }}</td>
      <!--td class="">{{ props.item.DDPercent }}</td-->
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
    name: "ApiDetailTable",
    props: {
      priceGroup: String,
      items: Array,
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
        getDataDetail: [],
        dataDetailTotal: {},
        pagination: {},
        loading: false,
      }
    },
    watch: {
      pagination() {
        this.getDataFromApi()
      }
    },
    methods: {
      async getDataFromApi() {
        this.loading = true;
        if (this.pagination)
          await this.$store.dispatch('getDataDetail', {
            priceGroupName: this.priceGroup,
            sortField: [this.pagination.sortBy, this.pagination.descending],
          });
        this.loading = false;
      }
    },
    computed: {},
    async created() {
      await
          this.$store.dispatch('getDataDetail', {
            priceGroupName: this.priceGroup
          });

      const data = this.$store.getters.dataDetail;
      this.getDataDetail = data[this.priceGroup];
      this.dataDetailTotal = this.getDataDetail.pop();
    }
  }
</script>

<style scoped>

</style>