<template>
  <div class="text-xs-center">
    <v-dialog
            v-model="modalInfo"
            width="800"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Артикул: {{modalRow.vendorСode}} Производитель: {{modalRow.manufacturer}}
        </v-card-title>

        <v-card-text>
          {{ objTecDoc }}

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
    data() {
      return {}
    },
    methods: {
      closeModalInfo() {
        this.$store.dispatch('setModalInfo', {openModal: false})
      },
      clickNotModal(event) {
        if (!(event.target.className === 'items__icon' || event.target.parentElement.className === 'items__icon')) {
          this.$store.dispatch('setModalInfo', {openModal: false})
        }
      }
    },
    computed: {
      modalInfo() {
        return this.$store.getters.modalInfo;
      },
      modalRow() {
        return Object.assign({modalRow: {vendorСode: '', manufacturer: ''}}, this.$store.getters.modalRow);
      },
      objTecDoc() {
        if(this.$store.getters.objTecDoc !== null && this.$store.getters.objTecDoc.isArticles){
          return this.$store.getters.objTecDoc;
        } else {
          return 'Информация по данному артикулу не найдена!';
        }
      },
    },
    created() {
      document.body.addEventListener('click', this.clickNotModal);
    }

  }
</script>

<style scoped>

</style>