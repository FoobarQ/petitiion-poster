<template>
  <div class="everything" v-if="chartOptions">
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
import { Chart } from "highcharts-vue";
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

  chartOptions: any = {
    series: [
      {
        name: "No. Signatures",
        color: "#080",
        data: [0], // sample data.
        pointStart: Date.now(),
        pointInterval: 5 * seconds,
      },
    ],
    xAxis: {
      type: "datetime",
      gridLineDashStyle: "dashed",
      lineColor: "black",
      lineWidth: "2",
    },
    yAxis: {
      allowDecimals: false,
      softMax: 10000,
      softMin: 9000,
      gridLineColor: "white",
      visible: false,
    },
    chart: {
      height: 800,
      width: 1600,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    title: {
      text: "",
    },
  };

  keyPairs: { [key: string]: number } = {
    signature_count: 0,
  };
  async mounted() {
    this.chartOptions.series[0].data = [
      this.$store.state.petition.signature_count,
    ];
    console.log(this.$store.state.petition.signature_count);
    this.chartOptions.yAxis.softMin =
      this.$store.state.petition.signature_count - 10;
    this.chartOptions.yAxis.softMax = this.chartOptions.yAxis.softMin + 40;
    setInterval(this.update_function, 10 * seconds);
  }

  async update_function() {
    for (const key in this.keyPairs) {
      this.chartOptions.series[this.keyPairs[key]].data.push(
        this.getSignatureCount(key)
      );
    }
  }

  addLine(name: string, type: string) {
    if (this.keyPairs[type + ":" + name] !== undefined) {
      return;
    }
    this.keyPairs[type + ":" + name] = this.chartOptions.series.length;
    this.chartOptions.series.push({
      data: [],
      pointStart: Date.now(),
      pointInterval: 10 * seconds,
      name,
    });
  }

  getSignatureCount(id: string): number {
    if (!id.includes(":")) {
      return this.$store.state.petition.signature_count;
    }
    const [type, name] = id.split(":");
    let searchList = this.$store.state.petition[type];
    let start = 0;
    let end = searchList.length - 1;
    let i = 0;
    while (end - start > 3) {
      i = Math.round((start + end) / 2);
      if (searchList[i].name === name) {
        return searchList[i].signature_count;
      } else if (searchList[i].name < name) {
        end = i;
      } else {
        start = i;
      }
    }

    for (const item of searchList) {
      if (item.name === name) {
        return item.signature_count;
      }
    }

    return 0;
  }
  toggle(id: string) {
    this.constituencies[id].show = !this.constituencies[id].show;
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
