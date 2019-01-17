<template>
  <div class="text-xs-center">

    <v-dialog
            v-model="modalInfo"
            max-width="600px"

    >
      <v-card
      >
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Артикул: {{objTecDoc.vendorCode}} Производитель: {{modalRow.manufacturer}}
        </v-card-title>

        <v-tabs
                color="cyan"
                dark
                slider-color="yellow"
        >
          <v-tab
                  :key="1"
                  ripple
          >
            Фото
          </v-tab>
          <v-tab
                  :key="2"
                  ripple
          >
            Совместимости
          </v-tab>
          <v-tab-item
                  :key="1"
          >
            <v-card flat>
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
                        :src="host + item.PictureName"
                        width="600"
                >
                </v-carousel-item>
              </v-carousel>
            </v-card>
          </v-tab-item>
          <v-tab-item
                  :key="2"
          >
            <v-card flat>
              <v-layout justify-space-between>
                <v-treeview ref="tree"
                            :items="objTecDoc.tree"
                            activatable
                            :active.sync="active"
                            style="height: 500px; overflow: auto"
                ></v-treeview>
                <v-data-table
                        :headers="headers"
                        :items="rows"
                        class="elevation-1"
                        hide-actions
                        no-data-text=""
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.constructioninterval }}</td>
                    <td class="text-xs-right">{{ props.item.description }}</td>
                  </template>
                </v-data-table>
              </v-layout>
            </v-card>
          </v-tab-item>
        </v-tabs>

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
      return {
        active: [],
        headers: [
          {text: 'Дата выпуска', value: 'constructioninterval'},
          {text: 'Описание', value: 'description'},
        ],
        rows: [],
        host: `http://${window.location.host}/upload/tmp2/`
      }
    },
    methods: {
      closeModalInfo() {
        this.$store.dispatch('setModalInfo', {openModal: false})
      },
      clickNotModal(event) {
        if (!(event.target.className === 'items__icon' || event.target.parentElement.className === 'items__icon')) {
          this.$store.dispatch('setModalInfo', {openModal: false})
        }
      },
    },
    computed: {
      modalInfo() {
        return this.$store.getters.modalInfo;
      },
      modalRow() {
        return Object.assign({modalRow: {vendorCode: '', manufacturer: ''}}, this.$store.getters.modalRow);
      },
      objTecDoc() {

        if (this.$store.getters.objTecDoc !== null && this.$store.getters.objTecDoc.isArticles) {
          const {img, ...obj} = this.$store.getters.objTecDoc;
          const {objTree: tree, modelArr: treeAll} = obj.vehicles;

          if (this.$refs.carousel.internalLazyValue + 1 > img.length) {
            this.$refs.carousel.internalLazyValue = 0;
          }
          return Object.assign({img, tree, treeAll}, obj);
        } else {
          return 'Информация по данному артикулу не найдена!';
        }
      },
      selected() {

        if (this.active[0] && this.modalInfo) {
          this.rows = this.objTecDoc.treeAll[this.active[0]];
        }
      },
    },
    created() {
      document.body.addEventListener('click', this.clickNotModal);
    },
    watch: {
      selected: ''
    },
  }
</script>

<style lang="scss">
  div.v-image__image.v-image__image--cover {
    background-size: contain
  }

  .v-dialog {
    padding: 10px
  }
</style>