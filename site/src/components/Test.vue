<template>
  <div class="test">
    <button @click="f">Click for Data</button>
    <button @click="g">Click to update Data</button>
    <button @click="pushData">TEST</button>
    <p id="pp">sda</p>
    <p id="calories">calories</p>
    <p id="fat">fat</p>
    <p id="carbs">carbs</p>
    <p id="protein">protein</p>
    <p id="sodium">sodium</p>
    <p id="iron">iron</p>

    <h2>FOOD history</h2>
    <ul>
      <li v-for="(f, ind) in food" :key="ind"> {{ food[ind] }} </li>
    </ul>
  </div>
</template>
<script>
  import db from '../firebase/init'
  export default {
    name: "Test",
    data() {
      return {
        food: []
      }
    },
    mounted() {
      db.collection("Food")
        .onSnapshot({
          // Listen for document metadata changes
          includeMetadataChanges: true
        }, (doc) => {
          console.log("Current data: ", doc.docs.id);
          this.food = []
          doc.docs.forEach((val) => {
            console.log(val.id)
            this.food.push(val.id)
          })
          var obj = doc.data();
        });
    },
    methods: {
      pushData: () => {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            } 
            if(mm<10) {
                mm = '0'+mm
            } 
            today = dd + '-' + mm + '-' + yyyy;
            


            var docRef = db.collection("food").doc(today);

            docRef.get()
            .then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data().Breakfast);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });


      }, 
      f: () => {
        db.collection("Food").doc("Pizza")
          .onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
          }, function (doc) {
            console.log("Current data: ", doc.data());
            var obj = doc.data();
            document.getElementById("calories").innerHTML = obj["calories"];
          });
      },
      g: () => {
        db.collection("cities").doc("LA").set({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    }
  }

</script>
