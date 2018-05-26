// CommitChart.js
import {
  Doughnut
} from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Fat', 'Carbs', 'Protein'],
      datasets: [{
        label: 'Carbs',
        backgroundColor: ['#f87979', '#009999', '#ffcc99'],
        data: [50, 25, 25]
      }]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
