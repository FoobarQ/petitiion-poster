<template>
  <div class="piechart">
    <div class="contents">
      <chart :options="chartOptions"></chart>
      <div class="options">
        <button v-on:click="setPieChart('constituency')">constituency</button>
        <button v-on:click="setPieChart('country')">country</button>
        <button v-on:click="setPieChart('region')">region</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";

const seconds = 1000;

interface Region {
  name: string;
  ons_code: string;
  signature_count: number;
}

interface Country {
  name: string;
  code: string;
  signature_count: number;
}

interface Constituency {
  name: string;
  ons_code: string;
  mp: string;
  signature_count: number;
}

@Component({
  components: {
    Chart,
  },
})
export default class PieChart extends Vue {
  @Prop() private petitionId!: number;
  signatures_by_region: any[] = [];
  signatures_by_country: any[] = [];
  signatures_by_constituency: any[] = [];
  chartOptions = {
    series: [
      {
        name: "signatures by region",
        type: "pie",
        data: [{}], // sample data.
      },
    ],

    plotOptions: {
      pie: {
        size: 300,
      },
    },
    title: {
      text: "",
    },
  };
  pieChart = "region";

  signatures_by_regionToPieData() {
    const x = this.$store.state.petition.signatures_by_region.map(
      (region: Region) => {
        return {
          name: region.name,
          y: region.signature_count,
        };
      }
    );
    this.chartOptions.series[0].data = x;
  }

  signatures_by_countryToPieData() {
    const x = this.$store.state.petition.signatures_by_country.map(
      (country: Country) => {
        return {
          name: country.name,
          y: country.signature_count,
        };
      }
    );
    this.chartOptions.series[0].data = x;
  }

  signatures_by_constituencyToPieData() {
    const x = this.$store.state.petition.signatures_by_constituency.map(
      (constituency: Constituency) => {
        return {
          name: constituency.name,
          y: constituency.signature_count,
        };
      }
    );
    this.chartOptions.series[0].data = x;
  }

  mounted() {
    setInterval(this.updatePieChart, 60 * seconds);
  }

  setPieChart(i: string) {
    this.pieChart = i;
    this.updatePieChart();
  }

  updatePieChart() {
    switch (this.pieChart) {
      case "constituency":
        this.signatures_by_constituencyToPieData();
        break;
      case "country":
        this.signatures_by_countryToPieData();
        break;
      case "region":
        this.signatures_by_regionToPieData();
        break;
      default:
        console.error("fuck, no piechart source");
    }
  }
}
</script>

<style>
.piechart > .contents {
  background: none;
}

.piechart {
  height: 450px;
  width: 550px;
}

button {
  margin: 0 10px;
}

.options {
  height: 100%;
}

svg {
  border-radius: 25px;
  border-width: 1px;
}
</style>
