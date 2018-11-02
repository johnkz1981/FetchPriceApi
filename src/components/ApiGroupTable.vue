<template>

  <v-app>
    <div>
      <v-tabs
              v-model="active"
              color="primary"
              dark
              slider-color="yellow"
      >
        <v-tab
                v-for="item in getApiPriceGroup"
        >
          {{ enRuPriceGroup[item] }}
        </v-tab>
        <v-tab-item
                v-for="item in getApiPriceGroup"

        >
          <!--v-card flat>
            <v-toolbar-title>Original</v-toolbar-title>
            <api-original-table/>
          </v-card-->
          <api-original-table
                  v-if="item === 'Original'"
          ></api-original-table>
          <api-detail-table
                  v-else
                  :priceGroup="item"
          ></api-detail-table>
        </v-tab-item>
      </v-tabs>

      <!--div class="text-xs-center mt-3">
        <v-btn @click="next">next tab</v-btn>
      </div-->
    </div>
    <!--p v-for="item in getApiPriceGroup">
      <v-toolbar-title>{{ item }}</v-toolbar-title>
      <api-detail-table
              :priceGroup="item"
      ></api-detail-table>
    </p-->
  </v-app>
</template>

<script>
  'use strict';

  import ApiDetailTable from './ApiDetailTable'
  import ApiOriginalTable from './ApiOriginalTable'

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
      ApiDetailTable,
      ApiOriginalTable
    },
    methods: {
      next() {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      }
    },
    computed: {
      getApiPriceGroup() {
        const arrPriceGroup = ['Original'];

        for (const item in this.$store.getters.apiPriceGroup) {
          if (this.$store.getters.apiPriceGroup[item].PriceGroup === 'Original') {
            continue;
          }
          arrPriceGroup.push(this.$store.getters.apiPriceGroup[item].PriceGroup)
        }
        this.active = 0;
        return arrPriceGroup;
      },
    }
  }
</script>

<style scoped>

</style>