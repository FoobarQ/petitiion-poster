<template>
  <div class="dash flex-container">
    <hello-world />
    <pie-chart />
    <line-chart />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import HelloWorld from "@/components/HelloWorld.vue";


@Component({
  components: {
    PieChart,
    LineChart,
    HelloWorld
  },
})
export default class Dashboard extends Vue {

}
</script>

<style scoped>
.dash {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 150px;
  left: 290px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color:rgb(247, 247, 247);
}

.flex-container > div {
  background-color: white;
  margin: 20px;
}
</style>