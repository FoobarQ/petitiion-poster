<template>
  <div class="legend">
    <template v-for="constituency of constituencyList">
      <p v-bind:key="constituency.ons_code">{{ constituency.name }}</p>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Chart } from "highcharts-vue";
import { constituencies } from "@/assets/constituencies";

const seconds = 1000;
@Component({
  components: {
    Chart,
  },
})
export default class ChartLegend extends Vue {
  constituencyList = constituencies;
}
</script>
