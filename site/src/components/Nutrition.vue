<template>
  <v-layout row wrap>
    <v-flex lg8 md8 xs12>
      <v-card class="carder">
        <v-card-title primary-title>
          <div>
            <div class="headline">Nutrition</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-slide-y-transition>
          <template>
            <v-container fluid grid-list-md>
              <v-data-iterator :items="food" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout"
                row wrap>
                <v-flex slot="item" slot-scope="props" align-content-center="true">

                  <v-card light="true" width="980px">
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ day }}</div>
                      </div>
                    </v-card-title>
                    <!-- <v-card-title>
                        <h4>{{ props.item.name }}</h4>
                      </v-card-title> -->
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content>Calories:</v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-progress-circular :value="(totalcals*100)/2200" color="blue-grey"></v-progress-circular>
                        <v-list-tile-content class="align-end">{{ Math.floor(totalcals) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Fat:</v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-progress-circular :value="(totalfat*100)/88" color="blue-grey"></v-progress-circular>
                        <v-list-tile-content class="align-end">{{ Math.floor(totalfat) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Carbs:</v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-progress-circular :value="(totalcarbs*100)/330" color="blue-grey"></v-progress-circular>
                        <v-list-tile-content class="align-end">{{ Math.floor(totalcarbs) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Protein:</v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-progress-circular :value="(totalprot*100)/132" color="blue-grey"></v-progress-circular>
                        <v-list-tile-content class="align-end">{{ Math.floor(totalprot) }}</v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <v-list-tile>
                        <v-list-tile-content>Sodium:</v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-progress-circular :value="(totalsod*100)/2300" color="blue-grey"></v-progress-circular>
                        <v-list-tile-content class="align-end">{{ totalsod }}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-data-iterator>
            </v-container>
          </template>
          This card summarizes your daily nutrition intake depending on all the food you have eaten so far.
        </v-slide-y-transition>
      </v-card>
    </v-flex>
    <v-flex lg4 md4 xs12>
      <macros class="carder" />
    </v-flex>
    <v-flex lg12 md12 xs12>
      <history class="carder" />
    </v-flex>
  </v-layout>
</template>

<style>
  .card {
    padding: 15px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 15px;
    margin-bottom: 15px;
  }

</style>

<script>
  import db from '../firebase/init'
  import Macros from './Macros'
  import CommitChart from './commitchart'
  import History from './History'
  export default {
    data: () => ({
      food: [],
      calprogress: [],
      protprogress: [],
      carbprogress: [],
      ironprogress: [],
      calcprogress: [],
      sodprogress: [],
      fatprogress: [],
      show: false,
      rowsPerPageItems: [1],
      pagination: {
        rowsPerPage: 1
      },
      totalcals: 0,
      today: null
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

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = dd + '-' + mm + '-' + yyyy;

      db.collection("food")
        .onSnapshot({
          // Listen for document metadata changes
          includeMetadataChanges: true
        }, (doc) => {
          console.log("Current data: ", doc.docs);
          this.food = []
          doc.docs.forEach((val) => {
            if (val.id == today) {
              //z console.log("Found", val.data())
              this.food = val.data().Meals
              this.food.reverse()
              this.totalcals = 0
              this.totalfat = 0
              this.totalcarbs = 0
              this.totalprot = 0
              this.totalsod = 0
              this.totalfib = 0
              for (let food of this.food) {

                this.totalcals += food.calories
                this.totalfat += food.fat
                this.totalcarbs += food.carbs
                this.totalprot += food.protein
                this.totalsod += food.sodium
                this.totalfib += food.fiber
                this.day = food.date
              }
            }
          })
        });
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
