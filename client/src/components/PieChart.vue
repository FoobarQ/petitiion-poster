<template>
  <div class="piechart">
    <div class="contents">
      <chart :options="chartOptions"></chart>
      <h2>Realtime Piechart</h2>
      <div class="options">
        <button
          class="left"
          v-on:click="setPieChart('constituency')"
          :disabled="pieChart === 'constituency'"
        >
          constituency
        </button>
        <button
          class="mid"
          v-on:click="setPieChart('country')"
          :disabled="pieChart === 'country'"
        >
          country
        </button>
        <button
          class="right"
          v-on:click="setPieChart('region')"
          :disabled="pieChart === 'region'"
        >
          region
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
        height: 2000,
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
  height: fit-content;
}

.piechart {
  height: 500px;
  width: 650px;
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
</style>
