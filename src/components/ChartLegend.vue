<template>
  <div class="legend">
    <template v-for="region of Object.keys(constituencies)">
      <div v-bind:key="region">
        <div class="region" @click="toggle(region)">
          <h1>{{ region }}</h1>
        </div>
        <template v-if="constituencies[region].show">
          <div
            v-for="constituency of constituencies[region].data"
            v-bind:key="constituency.ons_code"
            class="constituency"
          >
            {{ constituency.name }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart} from "highcharts-vue";
import {Constituency,
  London,
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
  NE,
} from "@/assets/constituencies";

const seconds = 1000;
interface Constituencies {
  [Region: string]: {
    data: Array<Constituency>;
    show: boolean;
  };
}
@Component({
  components: {
    Chart,
  },
})
export default class ChartLegend extends Vue {
  constituencies: Constituencies = {
    "East of England": { data: E, show: true },
    "East Midlands": { data: EastMidlands, show: false },
    London: { data: London, show: false },
    "North East": { data: NE, show: false },
    "Northern Ireland": { data: NI, show: false },
    "North West": { data: NW, show: false },
    Scotland: { data: Scotland, show: false },
    "South East": { data: SE, show: false },
    "South West": { data: SW, show: false },
    Wales: { data: Wales, show: false },
    "West Midlands": { data: WestMidlands, show: false },
    "Yorkshire & the Humber": { data: Yorkshire, show: false },
  };

  toggle(id: string) {
    this.constituencies[id].show = !this.constituencies[id].show;
  }
}
</script>

<style scoped>
.region {
  border-style: dashed;
  border-width: 2px;
  border-color: red;
  cursor: pointer;
}

.constituency {
  border-style: solid;
  border-width: 1px;
  border-color: green;
}
</style>
