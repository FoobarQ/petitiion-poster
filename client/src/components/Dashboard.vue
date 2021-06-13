<template>
  <div class="dash flex-container">
    <hello-world />
    <line-chart />
    <pie-chart />
    <twitter v-if="tweetId" :tweetId="tweetId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "../components/PieChart.vue";
import LineChart from "../components/LineChart.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Twitter from "../components/Tweets.vue";
import HappinessForm from "../components/HappinessForm.vue";

@Component({
  components: {
    PieChart,
    LineChart,
    Twitter,
    HelloWorld,
    HappinessForm,
  },
})
export default class Dashboard extends Vue {
  tweetId = "";
  beforeMount(): void {
    fetch(`/api/tweet/${this.$route.params.id}`)
      .then((response) => response.json())
      .then((tId) => {
        this.tweetId = tId;
      });
  }
}
</script>

<style>
.dash {
  position: fixed;
  width: 100%;
  top: 150px;
  left: 310px;
  overflow-y: auto;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(247, 247, 247);
}

.dash > div {
  background-color: white;
  margin: 20px;
  border-style: solid;
  border-color: lightgrey;
  border-radius: 10px;
  border-width: 1px;
  background: white;
}
</style>
