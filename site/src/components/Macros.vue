<template>
  <v-layout row>
    <v-card class="macros">
      <v-card-title primary-title>
        <div>
          <div class="headline">Macros</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat>Share</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-slide-y-transition>
        <CommitChart />
      </v-slide-y-transition>
      This card provides a summary of the ratio of the macros you consumed today.
    </v-card>
  </v-layout>
</template>

<script>
  import CommitChart from './commitchart'
  export default {
    name: "Macros",
    data: () => ({
      show: false
    }),
    components: {
      CommitChart
    }
  }

</script>

<style>


</style>
