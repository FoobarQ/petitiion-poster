<template>
  <div class="piechart">
    <chart :options="chartOptions"></chart>
    <div>
      <button v-on:click="setPieChart('constituency')">constituency</button>
      <button v-on:click="setPieChart('country')">country</button>
      <button v-on:click="setPieChart('region')">region</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";
import request from "request-promise";

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
    chart: {
      height: 800,
      width: 200
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
  pieChart = "region";

  signatures_by_regionToPieData() {
    const x = this.signatures_by_region.map((region: Region) => {
      return {
        name: region.name,
        y: region.signature_count,
      };
    });
    this.chartOptions.series[0].data = x;
  }

  signatures_by_countryToPieData() {
    const x = this.signatures_by_country.map((country: Country) => {
      return {
        name: country.name,
        y: country.signature_count,
      };
    });
    this.chartOptions.series[0].data = x;
  }

  signatures_by_constituencyToPieData() {
    const x = this.signatures_by_constituency.map(
      (constituency: Constituency) => {
        return {
          name: constituency.name,
          y: constituency.signature_count,
        };
      }
    );
    this.chartOptions.series[0].data = x;
  }

  async mounted() {
    setInterval(this.handlePetitionResponse, 3 * seconds);
  }

  async handlePetitionResponse() {
    const options = {
      method: "GET",
      url: `https://petition.parliament.uk/petitions/${this.petitionId}.json`,
    };
    const whatever = await request(options);
    const petition = JSON.parse(whatever).data.attributes;
    this.signatures_by_region = petition.signatures_by_region;
    this.signatures_by_country = petition.signatures_by_country;
    this.signatures_by_constituency = petition.signatures_by_constituency;
    this.updatePieChart();

    console.log("tick");
    return petition;
  }

  setPieChart(i: string) {
    this.pieChart = i;
    this.updatePieChart()
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
  /*async mounted() {
    const petition = await this.handlePetitionResponse();
    this.chartOptions.series[0].data = [petition.signature_count];
    this.chartOptions.yAxis.softMin = petition.signature_count - 10;
    this.chartOptions.yAxis.softMax = this.chartOptions.yAxis.softMin + 40;

    setInterval(this.update_function, 5 * seconds);
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
  }*/
}
</script>

<style scoped>
.piechart > div {
  background: white;
}

button {
  margin: 0 10px;
}
</style>