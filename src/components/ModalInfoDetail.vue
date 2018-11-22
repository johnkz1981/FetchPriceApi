<template>
  <div class="text-xs-center">
    <v-dialog
            v-model="modalInfo"
            scrollable
            width="600"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Артикул: {{objTecDoc.vendorCode}} Производитель: {{modalRow.manufacturer}}
        </v-card-title>
        <v-carousel
                :cycle="false"
                :dark="true"
                :hide-controls="true"
                :vertical="false"
                ref="carousel"
        >
          <v-carousel-item
                  v-for="item in objTecDoc.img"
                  :key="item.PictureName"
                  :src="'http://yugavtodetal.ru/upload/tmp2/' + item.PictureName"
                  width="600"

          >
          </v-carousel-item>
        </v-carousel>
        <!--v-card>

          <v-divider></v-divider>
          <v-card-text style="height: 500px">
            <li v-for="item in objTecDoc.img">
              <label for="">{{item.Description}}</label>
              <img :src="'http://yugavtodetal.ru/upload/tmp2/' + item.PictureName" :alt="item.PictureName">
            </li>

          </v-card-text-->

        <v-divider></v-divider>

        <v-card-actions>
          <v-layout justify-end>
            <v-btn
                    justify-end
                    color="primary"
                    flat
                    @click="closeModalInfo"
            >
              Ok
            </v-btn>
          </v-layout>
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

        if (this.$store.getters.objTecDoc !== null && this.$store.getters.objTecDoc.isArticles) {
          const {img, ...obj} = this.$store.getters.objTecDoc;

          if (img.length === 0) {
            img.push({PictureName: '78_nophoto.jpg', Description: ''});
          }
          if (this.$refs.carousel.internalLazyValue + 1 > img.length) {
            this.$refs.carousel.internalLazyValue = 0;
          }
          return Object.assign({img}, obj);
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

<style lang="sass">
  .v-image__image--cover
    background-size: contain
</style>