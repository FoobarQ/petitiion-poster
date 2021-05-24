<template>
  <div class="legend">
    <template v-for="region of Object.keys(constituencies)">
      <div v-bind:key="region">
        <h1>{{region}}</h1>
        <template v-for="constituency of constituencies[region]">
          {{constituency.name}}
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";
import { London,
  NW,
  E,
  Wales,
  Scotland,
  SE,
  WestMidlands,
  EastMidlands,
  Yorkshire,
  SW,
  NI,
  NE, } from "@/assets/constituencies";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class ChartLegend extends Vue {
  constituencies = {
    "East of England": E,
    "East Midlands": EastMidlands,
    "London": London,
    "North East": NE,
    "Northern Ireland": NI,
    "North West": NW,
    "Scotland": Scotland,
    "South East": SE,
    "South West": SW,
    "Wales": Wales,
    "West Midlands": WestMidlands,
    "Yorkshire & the Humber": Yorkshire
  }
}
</script>
