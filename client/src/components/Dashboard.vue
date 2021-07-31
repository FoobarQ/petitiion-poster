<template>
  <MatchMedia v-slot="{ mobile }">
    <div class="dash flex-container">
      <template v-if="mobile">
        <description />
        <line-chart />
        <pie-chart />
        <tweets v-if="tweetId" :tweetId="tweetId" />
      </template>
      <template v-else>
        <description />
        <line-chart />
        <pie-chart />
        <tweets v-if="tweetId" :tweetId="tweetId" />
      </template>
    </div>
  </MatchMedia>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "../components/PieChart.vue";
import LineChart from "../components/LineChart.vue";
import Description from "./Description.vue";
import Tweets from "../components/Tweets.vue";
import HappinessForm from "../components/HappinessForm.vue";
import { MatchMedia } from "vue-component-media-queries";

@Component({
  components: {
    PieChart,
    LineChart,
    Tweets,
    Description,
    HappinessForm,
    MatchMedia,
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
  top: 10%;
  left: 300px;
  overflow-y: auto;
  overflow-x: auto;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background-color: rgb(247, 247, 247);
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.dash::-webkit-scrollbar {
  display: none;
}

.dash > div {
  margin: 1.25em;
  border-style: solid;
  border-color: lightgrey;
  border-width: 1px;
  background: white;
}

@media (max-width: 1920px) {
  .dash > div {
    margin-top: 1%;
    margin-bottom: 1%;
  }
}

@media (max-width: 1080px) {
  .dash {
    left: 0px;
    top: 0px;
    margin-bottom: 170px;
  }

  .dash > div {
    margin-top: 1%;
    margin-bottom: 1%;
  }
}
</style>
