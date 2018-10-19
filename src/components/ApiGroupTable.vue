<template>
  <v-app>
    <v-toolbar-title>Original</v-toolbar-title>
    <api-original-table

    ></api-original-table>
    <ul v-for="item in getApiPriceGroup">
      <v-toolbar-title>{{ item.PriceGroup }}</v-toolbar-title>
      <api-detail-table
              :priceGroup ="item.PriceGroup"
      ></api-detail-table>
    </ul>
  </v-app>
</template>

<script>
  'use strict';

  import ApiDetailTable from './ApiDetailTable'
  import ApiOriginalTable from './ApiOriginalTable'

  export default {
    data() {
      return {}
    },
    name: "ApiGroupTable",
    components: {
      ApiDetailTable,
      ApiOriginalTable
    },
    methods: {
    },
    computed: {
      getApiPriceGroup() {
        return this.$store.getters.apiPriceGroup;
      },
    }
  }
</script>

<style scoped>

</style>