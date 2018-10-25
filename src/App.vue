<template>
  <v-app>
    <v-card-title>

      <v-spacer></v-spacer>
      <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              @keyup.enter="getData"
              v-model="searchCode"
      ></v-text-field>
    </v-card-title>
    <v-toolbar-title class="mb-2 text-xs-center">В наличии</v-toolbar-title>
    <bitrix-table
            class="mb-4"
    ></bitrix-table>
    <v-toolbar-title
            class="mb-4 text-xs-center"
    >Под заказ</v-toolbar-title>
    <api-summary-table
            class="mb-4"
    ></api-summary-table>
    <v-toolbar-title
            class="mb-4 text-xs-center"
    >Детализация данных</v-toolbar-title>
    <api-group-table
    ></api-group-table>
  </v-app>
</template>

<script>
  'use strict';

  import BitrixTable from './components/BitrixTable'
  import ApiSummaryTable from './components/ApiSummaryTable'
  import ApiGroupTable from './components/ApiGroupTable'

  export default {
    data() {
      return {
        searchCode: null,
      }
    },
    name: 'App',
    components: {
      BitrixTable,
      ApiSummaryTable,
      ApiGroupTable
    },
    methods: {
      /**
       * Запрашивает данные
       */
      getData() {
        this.$store.dispatch('getData', {
          searchCode: this.searchCode,
        })
      },
    },
    created() {
      const searchElement = document.querySelector('.v-input__append-inner');
      /*searchElement.addEventListener('click', () => {
        console.log(1)
      })*/
      console.log(searchElement)
    },
    computed: {

    }
  }
</script>
