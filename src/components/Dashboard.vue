<template>
  <div class="dash flex-container">
    <hello-world />
    <line-chart />
    <div>
    <pie-chart />
    <twitter :tweetId="'692527862369357824'"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Twitter from "@/components/Tweets.vue";
import { Tweet, Moment, Timeline } from 'vue-tweet-embed';


@Component({
  components: {
    PieChart,
    LineChart,
    Twitter,
    HelloWorld
  },
})
export default class Dashboard extends Vue {}
</script>

<style>
.dash {
  position: fixed;
  width: 100%;
  top: 150px;
  left: 310px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(247, 247, 247);
}

.flex-container > div {
  background-color: white;
  margin: 20px;
  border-style: solid;
  border-color: lightgrey;
  border-radius: 10px;
  border-width: 1px;
  background: white;
}
</style>