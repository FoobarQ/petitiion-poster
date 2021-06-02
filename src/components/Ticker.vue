<template>
  <div class="ticker">
    <h1>Total Signatures</h1>
    <h2 v-if="$store.state.petition">
      {{ $store.state.petition.signature_count }}
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const seconds = 1000;
@Component({})
export default class Ticker extends Vue {}
</script>

<style lang="scss" scoped>
.ticker {
  height:80px;
  width: 100%;
  color: #080;
  cursor: default;
}

h1 {
  margin-bottom: 2px;
}

h2 {
  margin-top: 4px;
}
</style>
