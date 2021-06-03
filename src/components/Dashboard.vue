<template>
  <div class="dash flex-container">
    <hello-world />
    <line-chart />
    <pie-chart />
    <twitter :tweetId="'692527862369357824'"/>
    <happiness-chart v-if="$store.state.petition.closed_at"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Twitter from "@/components/Tweets.vue";
import HappinessForm from '@/components/HappinessForm.vue';


@Component({
  components: {
    PieChart,
    LineChart,
    Twitter,
    HelloWorld,
    HappinessForm
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