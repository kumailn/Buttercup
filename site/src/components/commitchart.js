// CommitChart.js
import {
  Doughnut
} from 'vue-chartjs'

import db from '../firebase/init'

export default {
  extends: Doughnut,
  data() {
    return{
      totalfat: 0,
      totalcarbs: 0,
      totalp: 0
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
        this.totalcarbs = 0;
        this.totalfat = 0;
        this.totalp = 0;
        doc.docs.forEach((val) => {
          if (val.id == today) {
            //z console.log("Found", val.data())
            this.food = val.data().Meals
            for(let item of val.data().Meals){
                this.totalcarbs += item.carbs;
                this.totalfat += item.fat;
                this.totalp += item.protein;
            }
          }
        })
        this.renderChart({
          labels: ['Fat', 'Carbs', 'Protein'],
          datasets: [{
            label: 'Carbs',
            backgroundColor: ['#f87979', '#009999', '#ffcc99'],
            data: [this.totalfat * 9, this.totalcarbs * 4, this.totalp * 4]
           // data: [50, 25, 25]
    
          }]
        }, {responsive: true, maintainAspectRatio: false})
      });
    // Overwriting base render method with actual data.

  }
}
