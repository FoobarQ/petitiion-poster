<template>
  <div>
    <chart :options="chartOptions"></chart>
    <button @click="addLine('North West', 'signatures_by_region')">
      North West
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class LineChart extends Vue {
  chartOptions: any = {
    series: [
      {
        name: "No. Signatures",
        color: "#080",
        data: [], // sample data.
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
    this.chartOptions.yAxis.softMin =
      this.$store.state.petition.signature_count - 10;
    this.chartOptions.yAxis.softMax = this.chartOptions.yAxis.softMin + 40;
    setInterval(this.update_function, 5 * seconds);
  }

  async update_function() {
    for (const key in this.keyPairs) {
      console.log(key + " " + this.getSignatureCount(key));
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
      pointInterval: 5 * seconds,
      name,
    });
  }

  getSignatureCount(id: string): number {
    if (!id.includes(":")) {
      return this.$store.state.petition.signature_count;
    }
    const [type, name] = id.split(":");
    let searchList = [...this.$store.state.petition[type]];

    while (searchList.length > 3) {
      const i = Math.round(searchList.length / 2);
      if (searchList[i].name === name) {
        return searchList[i].signature_count;
      } else if (searchList[i].name < name) {
        searchList = searchList.slice(0, i);
      } else {
        searchList = searchList.slice(i);
      }
    }

    for (const item of searchList) {
      if (item.name === name) {
        return item.signature_count;
      }
    }

    return -1;
  }
}
</script>
