<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3 align-start="true">
      <v-card class="carder">
        <v-card-title primary-title>
          <div>
            <div class="headline">Nutrition</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="purple" icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            <template>
              <v-container fluid grid-list-md>
                <v-data-iterator :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout"
                  row wrap>
                  <v-flex slot="item" slot-scope="props" align-content-center="true">
                    <v-card light="true" width="300px">
                      <v-card-title>
                        <h4>{{ props.item.name }}</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-tile>
                          <v-list-tile-content>Calories:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="calprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Fat:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="fatprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Carbs:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="carbprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Protein:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="protprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Sodium:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="sodprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Calcium:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular :value="calcprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile>
                          <v-list-tile-content>Iron:</v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-progress-circular class="align-end" :value="ironprogress[rand()]" color="blue-grey"></v-progress-circular>
                          <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-data-iterator>
              </v-container>
            </template>
            This card summarizes your daily nutrition intake depending on all the food you have eaten so far.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
      <macros class="carder" />
      <history class="carder" />
    </v-flex>
  </v-layout>
</template>

<style>
  .carder {
    padding: 15px;
    margin: 20px;
  }

  .card {
    padding: 10px;
  }

</style>

<script>
  import Macros from './Macros'
  import CommitChart from './commitchart'
  import History from './History'
  export default {
    data: () => ({
      calprogress: [],
      protprogress: [],
      carbprogress: [],
      ironprogress: [],
      calcprogress: [],
      sodprogress: [],
      fatprogress: [],
      show: false,
      rowsPerPageItems: [2],
      pagination: {
        rowsPerPage: 2
      },
      items: [{
          value: false,
          name: 'Saturday May 26',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Sunday May 27',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          value: false,
          name: 'Monday May 28',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          value: false,
          name: 'Tuesday May 29',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          value: false,
          name: 'Wednesday May 30',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          value: false,
          name: 'Thursday May 31',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          value: false,
          name: 'Friday June 1',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          value: false,
          name: 'Saturday June 2',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          value: false,
          name: 'Sunday June 3',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          value: false,
          name: 'Monday June 4',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }),
    mounted() {
      for (var i = 0; i < 10; i++) {
        this.carbprogress.push(Math.floor((Math.random() * 100) + 1));
        this.fatprogress.push(Math.floor((Math.random() * 100) + 1));
        this.calprogress.push(Math.floor((Math.random() * 100) + 1));
        this.ironprogress.push(Math.floor((Math.random() * 100) + 1));
        this.calcprogress.push(Math.floor((Math.random() * 100) + 1));
        this.protprogress.push(Math.floor((Math.random() * 100) + 1));
        this.sodprogress.push(Math.floor((Math.random() * 100) + 1));
      }
    },
    methods: {
      rand() {
        return Math.floor((Math.random() * 10) + 1)
      }
    },
    components: {
      Macros,
      History
    }
  }

</script>
