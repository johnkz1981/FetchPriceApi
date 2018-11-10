<template>

  <v-app>
    <div>
      <v-tabs
              v-model="active"
              color="primary"
              dark
              slider-color="yellow"
              class="tabs-table"
      >
        <v-tab
                v-for="item in getApiPriceGroup"
                :key="item"
                @click="next"
        >
          {{ enRuPriceGroup[item] }}
        </v-tab>
        <v-tab-item
                v-for="item in getApiPriceGroup"
                :key="item"
        >
          <api-general-table
                  :priceGroup="item"
          ></api-general-table>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-app>
</template>

<script>
  'use strict';

  import ApiGeneralTable from './ApiGeneralTable'

  export default {
    data() {
      return {
        active: null,
        enRuPriceGroup: {
          Original: "Оригинал",
          ReplacementOriginal: "Замены",
          ReplacementNonOriginal: "Аналоги",
          DetailParts: "Части искомой детали",
          PartOfDetail: "Узел (аггрегат), частью которого являются искомые детали",
          NewNumber: "Новые номера",
        },
      }
    },
    name: "ApiGroupTable",
    components: {
      ApiGeneralTable
    },
    methods: {
      next(){
        setTimeout(() => this.$store.commit('setActiveTab', this.active),0);
      }
    },
    computed: {
      getApiPriceGroup() {
        this.active = 0;
        return this.$store.getters.apiPriceGroup;
      },
    }
  }
</script>

<style lang="sass">
</style>