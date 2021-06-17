<template>
  <div class="piechart">
    <div class="title desktop">
      <h1>Pie Chart</h1>
    </div>
    <div class="title mobile" @click="() => (show = !show)">
      <h1>Pie Chart</h1>
    </div>
    <div class="contents" v-if="show">
      <chart :options="chartOptions"></chart>
      <div class="options">
        <button
          class="left"
          v-on:click="setPieChart('constituency')"
          :disabled="pieChart === 'constituency'"
        >
          Constituency
        </button>
        <button
          class="mid"
          v-on:click="setPieChart('country')"
          :disabled="pieChart === 'country'"
        >
          Country
        </button>
        <button
          class="right"
          v-on:click="setPieChart('region')"
          :disabled="pieChart === 'region'"
        >
          Region
        </button>
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
  show = true;
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
    chart: {
      styledMode: false,
      height: "53%",
    },

    plotOptions: {
      pie: {
        slicedOffset: 0,
        size: "100%",
        dataLabels: {
          enabled: false,
        },
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
    setInterval(this.updatePieChart, 5 * seconds);
  }

  setPieChart(i: string) {
    this.pieChart = i;
    this.updatePieChart();
  }

  updatePieChart() {
    if (this.$store.state.status) {
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
}
</script>

<style>
.piechart > .contents {
  background: none;
}

.piechart {
  width: 30%;
}

button {
  margin: 0 10px;
}

.options {
  height: 100%;
}

svg {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}

button {
  height: 32px;
  width: 34%;
  margin: 0px;
  border-width: 0px;
  border-top-width: 1px;
  border-color: lightgrey;
  border-style: solid;
}

button.mid {
  width: 32%;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: lightgrey;
}

button.left {
  border-bottom-left-radius: 10px;
}

button.right {
  border-bottom-right-radius: 10px;
}

button:hover:not([disabled]) {
  cursor: pointer;
  background-color: darkgrey;
}

button[disabled] {
  background-color: darkgrey;
  color: white;
}

@media (max-width: 1080px) {
  .piechart {
    width: 98%;
  }
}
</style>
