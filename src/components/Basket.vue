<template>
  <td class=""
  >
    <div class="shopping-cart">
      <input
              type="number"
              :value="item.LotQuantity || 1"
              :min="item.LotQuantity || 1"
              :max="item.quantity"
              :class="`shopping-cart__input input${item.id}`"

      >
      <v-btn
              icon
              color="success"
              flat
              @click="addShoppingCart(item, $event)"

      >
        <v-badge
                color="warning"
        >
          <span slot="badge">{{basketCountForId}}</span>

          <v-icon dark>shopping_cart</v-icon>
        </v-badge>
      </v-btn>
    </div>
  </td>
</template>

<script>
  export default {
    name: "Basket",
    props: {
      item: Object
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      addShoppingCart(row, e) {
        for(const item of e.currentTarget.parentNode.children){
          if(item.nodeName === 'INPUT'){
            this.basketCountForId = {...row, count: item.value};
          }
        }

      }
    },
    computed: {
      basketCountForId: {
        get() {
          this.$store.getters.excite;
          if (this.$store.getters.basketCountForId[this.item.id]) {
            return this.$store.getters.basketCountForId[this.item.id].count;
          }
          return 0;
        },
        set(item) {
          const {id, count, isBitrix} = item;
          this.$store.dispatch('getIdProductFromRedis', {id, count, isBitrix});
          return this.basketCountForId;
        }
      },
    }
  }
</script>

<style>

  div.shopping-cart {
    display: flex;
  }

  input.shopping-cart__input {
    width: 40px;
    margin-right: 10px;
    outline: #1976d2 solid 2px;
    text-align: center;
  }

</style>