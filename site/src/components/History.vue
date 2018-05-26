<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="headline">History</div>
        </div>
      </v-card-title>
      <v-data-table :headers="headers" :items="food" hide-actions class="elevation-1" >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.sodium}}</td>
          <td class="text-xs-right">{{ props.item.fiber}}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
  import db from '../firebase/init'
  export default {
    data() {
      return {
        att: true,
        headers: [{
            text: 'Food',
            align: 'center',
            value: 'name'
          },
          {
            text: 'Calories',
            value: 'calories'
          },
          {
            text: 'Fat (g)',
            value: 'fat'
          },
          {
            text: 'Carbs (g)',
            value: 'carbs'
          },
          {
            text: 'Protein (g)',
            value: 'protein'
          },
          {
            text: 'Sodium (mg)',
            value: 'sodium'
          },
          {
            text: 'Fiber (g)',
            value: 'fiber'
          }
        ],
        food: [],
      }
    },
    mounted() {
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
              this.food
            }
          })
        });
    }
  }

</script>
<style>


</style>
