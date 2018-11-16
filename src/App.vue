<template>
  <v-app>
    <v-card-title>

      <v-spacer></v-spacer>
      <v-text-field
              append-icon="search"
              label="Поиск"
              :loading="getLoadingBitrix"
              single-line
              hide-details
              @keyup.enter="getData"
              v-model="searchCode"
      ></v-text-field>
    </v-card-title>
    <v-toolbar-title
            class="mb-2 text-xs-center"
            v-show="getDataBitrix"
    >
      В наличии
    </v-toolbar-title>
    <bitrix-table
            v-show="getDataBitrix"
            class="mb-4"
    ></bitrix-table>
    <v-toolbar-title
            class="mb-4 text-xs-center"
    >Под заказ
    </v-toolbar-title>
    {{isSummary}}
    <api-summary-table
            class="mb-4"
    ></api-summary-table>
    <v-toolbar-title id="detail"
                     class="mb-4 text-xs-center"
                     v-show="isDetail"
    >Детализация данных
    </v-toolbar-title>
    <api-group-table
            v-show="isDetail"
    ></api-group-table>
    <v-snackbar
            v-model="errorMessage"
            :bottom="true"
            :multi-line="true"
            :timeout="1000000"
            color="red darken-4"
    >
      Проблемы с сетью просим прощения за неудобства!!!
      Попробуйте повторить чуть попозже.
    </v-snackbar>
    <ModalInfoDetail/>
  </v-app>
</template>

<script>
  'use strict';

  import BitrixTable from './components/BitrixTable'
  import ApiSummaryTable from './components/ApiSummaryTable'
  import ApiGroupTable from './components/ApiGroupTable'
  import ModalInfoDetail from './components/ModalInfoDetail'

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
      ApiGroupTable,
      ModalInfoDetail
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
    },
    computed: {
      isDetail() {
        return !this.$store.getters.hideDetail;
      },
      isSummary() {
        if (this.$store.getters.dataApi !== undefined) {
          //console.log( this.$store.getters.dataApi.length);
        }
      },
      getLoadingBitrix() {
        return this.$store.getters.bitrixLoading;
      },
      getDataBitrix() {
        if (this.$store.getters.dataBitrix === undefined || this.$store.getters.dataBitrix.length === 0) {
          return false;
        }
        return this.$store.getters.dataBitrix.item.length !== 0;
      },
      errorMessage() {
        return this.$store.getters.errorMessage;
      },
    }
  }
</script>
