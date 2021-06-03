<template>
  <div class="linechart" v-if="chartOptions.series">
    <chart v-bind:options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";
import { Getter } from "vuex-class";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class LineChart extends Vue {
  @Getter("chartOptions")
  chartOptions!: any;

  keyPairs: { [key: string]: number } = {
    signature_count: 0,
  };
  async mounted() {
    this.$store.state.chartOptions.series[0].data.push(this.$store.state.petition.signature_count);
    this.$store.state.chartOptions.yAxis.softMin =
      this.$store.state.petition.signature_count - 10;
    this.$store.state.chartOptions.yAxis.softMax = this.$store.state.chartOptions.yAxis.softMin + 40;
    console.log(this.chartOptions);
    setInterval(this.update_function, 5 * seconds);
  }

  async update_function() {
    for (const key in this.$store.state.keyPairs) {
      console.log(key + " " + this.getSignatureCount(key));
      this.$store.state.chartOptions.series[this.$store.state.keyPairs[key]].data.push(
        this.getSignatureCount(key)
      );
    }
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
}
</script>

<style>
.linechart > .contents {
  background: none;
}

.linechart {
  border-style: solid;
  border-color: lightgrey;
  border-radius: 25px;
  border-width: 1px;
  background: none;
  height: fit-content;
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
