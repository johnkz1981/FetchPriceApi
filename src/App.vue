<template>
  <v-app>
    <v-card-title>
      В наличии
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
    <bitrix-table
    ></bitrix-table>
    <v-spacer></v-spacer>
    Под заказ
    <api-summary-table
    ></api-summary-table>
    Группа таблиц
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
        url: 'http://yugavtodetal.ru/api/get-api-query.php',
        bitrixLoading: false,
        apiLoading: false,
        apiData: [],
        bitrixData: [],
        apiTotal: {},
        bitrixTotal: {},
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
          url: this.url,
          searchCode: this.searchCode,
          bitrix: 'yes',
          substLevel: 'OriginalOnly'
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
