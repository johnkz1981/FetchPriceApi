<template>
  <div class="api-original">
    <v-progress-circular
            v-show="getOriginalLoadingTable"
            :size="50"
            color="primary"
            indeterminate
            class="progress-circular"
    ></v-progress-circular>
    <v-data-table
            :headers="headers"
            :items="getDataDetail"
            hide-actions
            class="elevation-1 data-table"
            :loading="loading"
    >

      <template slot="items" slot-scope="props">
        <td class="">{{ props.item.manufacturer }}</td>
        <td class="">{{ props.item.vendorСode }}</td>
        <td>{{ props.item.name }}</td>
        <td class="">{{ props.item.quantity }}</td>
        <td class="">{{ props.item.price }}</td>
        <td>
          <v-progress-circular
                  class="mb-1 mt-1"
                  :rotate="360"
                  :size="50"
                  :width="5"
                  :value="+props.item.DDPercent"
                  :color="props.item.color"
          >
            {{ isNaN(+props.item.DDPercent) ? "?" : parseInt(+props.item.DDPercent) }}
          </v-progress-circular>
        </td>
        <td class="">{{ props.item.LotQuantity }}</td>
      </template>
      <template slot="footer" :loading="true" class="footer">
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
        <td colspan="4" class="up-button" align="right" @click="clickUp">
          <v-btn
                  slot="activator"
                  color="red"
                  dark
          >
            На вверх
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
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
          {text: 'Цена', value: 'price'},
          {text: 'Вероятность', value: 'DDPercent'},
          {text: 'Кратность', value: 'LotQuantity'},
        ],
        dataDetailTotal: {},
        isBottomPage: false,
        isLazyQuery: false
      }
    },
    methods: {
      clickUp() {
        window.scrollTo({
          'behavior': 'smooth',
          'left': 0,
          'top': document.getElementById('detail').offsetTop
        });
      },
      getIsLazyQuery() {
        return document.documentElement.scrollHeight ===
            document.documentElement.scrollTop +
            document.documentElement.clientHeight &&
            this.dataDetailTotal.countApi > this.getLimit &&
            this.getLimit !== 0;
      }
    },
    computed: {
      getDataDetail() {
        if (this.$store.getters.dataOriginal !== undefined &&
            this.$store.getters.dataOriginal.item !== undefined &&
            this.$store.getters.dataOriginal.item.length > 0) {
          this.dataDetailTotal = this.$store.getters.dataOriginal.total;
          if (!this.getBottomPage) {
            window.scrollTo({
              'behavior': 'smooth',
              'left': 0,
              'top': document.getElementById('detail').offsetTop
            });
          }
        }
        return this.$store.getters.dataOriginal.item;
      },
      getOriginalLoadingTable() {
        return this.$store.getters.originalLoadingTable;
      },
      getLimit() {
        return this.$store.getters.limit;
      },
      getBottomPage() {
        return this.$store.getters.bottomPage;
      },
    },
    created() {

      window.addEventListener('scroll', () => {

        if (this.getIsLazyQuery()) {
          this.isLazyQuery = true;
          this.$store.dispatch('getOriginal', {
            limit: this.getLimit,
          });
          this.isLazyQuery = false;
        }
      })
    }
  }
</script>

<style lang="sass" scoped>
  .api-original
    position: relative
    .progress-circular
      position: fixed
      bottom: 50vh
      left: 50vw
      z-index: 1000
</style>