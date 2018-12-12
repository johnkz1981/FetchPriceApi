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

<style scoped>

</style>