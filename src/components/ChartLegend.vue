<template>
  <div class="everything">
    <div class="legend">
      <ticker />
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
              <input
                type="checkbox"
                :id="constituency.ons_code"
                :name="constituency.ons_code"
                @click="
                  addLine(constituency.name, 'signatures_by_constituency')
                "
              />
              <label :for="constituency.ons_code">{{
                constituency.name
              }}</label>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Constituency,
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
import Ticker from "@/components/Ticker.vue";

const seconds = 1000;
interface Constituencies {
  [Region: string]: {
    data: Array<Constituency>;
    show: boolean;
  };
}
@Component({
  components: {
    Ticker,
  },
})
export default class ChartLegend extends Vue {
  constituencies: Constituencies = {
    "East of England": { data: E, show: false },
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

  addLine(name: string, type?: string) {
    if (this.$store.state.keyPairs[type + ":" + name] !== undefined) {
      return;
    }
    if (type) {
      this.$store.state.keyPairs[type + ":" + name] = this.$store.state.chartOptions.series.length;
      this.$store.state.chartOptions.series.push({
      data: [],
      pointStart: Date.now(),
      pointInterval: 10 * seconds,
      name,
    });
    } else {
      this.$store.state.keyPairs[name] = this.$store.state.chartOptions.series.length;
      this.$store.state.chartOptions.series.push({
          color: "#080",
          data: [], // sample data.
          pointStart: Date.now(),
          pointInterval: 5 * 1000,
          name
        });
    }

  }

  toggle(id: string) {
    this.constituencies[id].show = !this.constituencies[id].show;
  }

  mounted() {
    this.addLine("Total Signatures");
  }
}
</script>

<style lang="scss" scoped>
.region {
  cursor: pointer;
  text-align: left;

  h1 {
    padding: 0px;
    margin: 0px;
  }
}

.region:hover {
  background: rgb(240, 240, 240);
}

.constituency {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: green;
  text-align: left;
}

.legend {
  width: 300px;
  float: left;
  overflow-y: auto;
  top: 150px;
  height: 100%;
  border-right-color: lightgrey;
  border-right-style: solid;
  border-right-width: 1px;
  position: fixed;
  z-index: 1;
}
</style>
