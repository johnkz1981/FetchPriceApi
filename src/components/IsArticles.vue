<template>
  <td
          @click="openModalInfo(item, isArticlesArr[item.brandAndCode])"
          :class="isArticlesArr[item.brandAndCode] ? 'items__icon_open' : 'items__icon_disable'"
  >
    <v-icon
            v-if="isArticlesArr[item.brandAndCode] === true"
            color="success"
    >info
    </v-icon>
    <v-icon
            v-else-if="isArticlesArr[item.brandAndCode] === false"
            color="error"
    >cancel
    </v-icon>
    <v-icon
            v-else
            color="warning"
    >cached
    </v-icon>
  </td>
</template>

<script>
  export default {
    name: "IsArticles",
    props: {
      item: Object
    },
    methods: {
      isArticles(val) {

        let isArr = -1;
        const brandAndCodeArr = [];

        for (const row of val) {
          isArr = brandAndCodeArr.findIndex(elem => {
            return elem === row.brandAndCode;
          });

          if (isArr === -1) {
            brandAndCodeArr.push(row.brandAndCode);

            this.$store.dispatch('setIsArticlesArr', {
              isArticles: true,
              vendorCode: row.vendorCode,
              manufacturer: row.manufacturer,
              brandAndCode: row.brandAndCode,
              isTecdoc: true
            });
          }
        }
      },
      openModalInfo(row, isArticles) {
        if (isArticles === false) {
          return;
        }
        this.$store.dispatch('setModalInfo', {
          row: row,
          openModal: true
        })
      },
    },
    computed: {
      isArticlesArr() {
        let obj = {};

        for (const item of this.$store.getters.isArticlesArr) {
          obj = Object.assign(obj, {[item.brandAndCode]: item.isArticles})
        }
        return obj;
      },
    }
  }
</script>

<style>
  .items__icon_open {
    cursor: pointer;
  }

  .items__icon_disable {
    cursor: not-allowed;
  }

</style>