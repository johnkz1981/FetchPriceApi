<template>
  <div class="text-xs-center">
    <v-dialog
            v-model="modalInfo"
            width="500"
    >
      <v-btn
              slot="activator"
              color="red lighten-2"
              dark
      >
        Click Me
      </v-btn>

      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="primary"
                  flat
                  @click="closeModalInfo"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "ModalInfoDetail",
    data () {
      return {
      }
    },
    methods: {
      closeModalInfo(){
        this.$store.dispatch('setModalInfo', false)
      }
    },
    computed: {
      modalInfo() {
        return this.$store.getters.modalInfo;
      },
    }
  }
</script>

<style scoped>

</style>