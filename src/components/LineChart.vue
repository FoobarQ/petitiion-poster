<template>
  <chart :options="chartOptions"></chart>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";
import request from "request-promise";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class LineChart extends Vue {
  @Prop() private petitionId!: number;
  chartOptions = {
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
      width: 1600
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

  async mounted() {
    const petition = await this.handlePetitionResponse();
    this.chartOptions.series[0].data = [petition.signature_count];
    this.chartOptions.yAxis.softMin = petition.signature_count - 10;
    this.chartOptions.yAxis.softMax = this.chartOptions.yAxis.softMin + 40;

    setInterval(this.update_function, 5 * seconds);
  }

  async handlePetitionResponse() {
    const options = {
      method: "GET",
      url: `https://petition.parliament.uk/petitions/${this.petitionId}.json`,
    };
    const whatever = await request(options);
    const petition = JSON.parse(whatever).data.attributes;
    return petition;
  }

  async update_function() {
    const { signature_count } = await this.handlePetitionResponse();
    this.chartOptions.series[0].data.push(signature_count);
    //this.chartOptions.series[0].pointStart = this.chartOptions.series[0].pointStart - 2 * seconds;
  }

  titleify(input: string) {
    let x = input.split(" ");
    x = x.map((value) => value.slice(0, 1).toUpperCase() + value.slice(1));
    return `${x.join(" ")}`;
  }
}
</script>
