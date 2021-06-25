<template>
  <div class="linechart" v-if="chartOptions.series">
    <div class="title desktop">
      <h1>Realtime Signature Count</h1>
    </div>
    <div class="title mobile" @click="() => (show = !show)">
      <h1>Realtime Signature Count</h1>
    </div>
    <chart v-bind:options="chartOptions" v-show="show" />
    <button
      class="left"
      @click="showHistory(false)"
      :disabled="showRealtime"
      v-show="show"
    >
      Real-time Data</button
    ><button
      class="right"
      @click="showHistory(true)"
      :disabled="!showRealtime"
      v-show="show"
    >
      Historical Data
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Chart, ChartOptions } from "highcharts-vue";
import { Getter } from "vuex-class";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class LineChart extends Vue {
  historicalSignatureData: [number, number][] = [];
  showRealtime = true;
  show = true;

  @Getter("chartOptions")
  chartOptions!: ChartOptions;

  async mounted(): Promise<void> {
    console.log("mounted");
    if (this.$store.state.status) {
      await fetch(`/api/signatures/${this.$route.params.id}`)
        .then((response) => response.json())
        .then((timescaleResponse) => {
          timescaleResponse.forEach((element: [number, number]) => {
            this.historicalSignatureData.push([element[0], element[1]]);
          });
        });
    }

    this.$store.state.keyPairs["realtime:signature_count"] =
      this.$store.state.chartOptions.series.length;
    this.$store.state.chartOptions.series.push({
      color: "#080",
      data: [], // sample data.
      name: "Total Signatures",
      type: "spline",
    });

    this.$store.state.keyPairs["historic:signature_count"] =
      this.$store.state.chartOptions.series.length;
    this.$store.state.chartOptions.series.push({
      visible: false,
      showInLegend: false,
      color: "#080",
      data: this.historicalSignatureData, // sample data.
      name: "Total Signatures",
      type: "spline",
    });
    this.update_function();
    this.$store.state.chartOptions.yAxis.softMin =
      this.$store.state.petition.signature_count - 10;
    this.$store.state.chartOptions.yAxis.softMax =
      this.$store.state.chartOptions.yAxis.softMin + 40;
    setInterval(this.update_function, 5 * seconds);
  }

  async update_function(): Promise<void> {
    const now = Date.now();
    for (const key in this.$store.state.keyPairs) {
      this.$store.state.chartOptions.series[
        this.$store.state.keyPairs[key]
      ].data.push([now, this.getSignatureCount(key)]);
    }
    return;
  }

  getSignatureCount(id: string): number | number[] {
    const [type, name] = id.split(":");
    if (name == "signature_count") {
      return this.$store.state.petition.signature_count;
    }
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

  showHistory(show: boolean): void {
    this.showRealtime = !show;
    for (const key in this.$store.state.keyPairs) {
      this.$store.state.chartOptions.series[
        this.$store.state.keyPairs[key]
      ].visible = !show;
      this.$store.state.chartOptions.series[
        this.$store.state.keyPairs[key]
      ].showInLegend = !show;
    }
    this.$store.state.chartOptions.series[
      this.$store.state.keyPairs["historic:signature_count"]
    ].showInLegend = show;
    this.$store.state.chartOptions.series[
      this.$store.state.keyPairs["historic:signature_count"]
    ].visible = show;
  }
}
</script>

<style scoped>
.linechart > .contents {
  background: none;
}

.linechart {
  border-radius: 10px;
  border-width: 1px;
  height: fit-content;
  width: 66.2%;
}

button {
  margin: 0 10px;
}

.options {
  height: 100%;
}

button {
  bottom: 0px;
  margin-left: 0%;
  margin-right: 0%;
  width: 50%;
  z-index: 2;
  border-width: 0px;
  height: 30px;
  border-top-width: 1px;
  border-color: lightgrey;
}

button.right {
  border-left-width: 1px;
}

@media (max-width: 1080px) {
  .linechart {
    width: 98%;
  }
}
</style>
