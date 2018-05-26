<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
                     <CommitChart/> 

        <v-card-title primary-title>
          <div>
            <div class="headline">Macros</div>
            <span class="grey--text">Ratio of your consumed macros</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="purple" icon @click.native="show = !show"><v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon></v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
              <CommitChart/> 
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import CommitChart from './commitchart'
  export default {
    name: "Macros",
    data: () => ({
      show: false
    }),
    components:{
        CommitChart
    }
  }
</script>