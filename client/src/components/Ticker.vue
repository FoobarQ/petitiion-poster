<template>
  <div class="ticker">
    <h1>Total Signatures</h1>
    <h2 v-if="$store.state.petition">
      {{ $store.state.petition.signature_count }}
    </h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Ticker extends Vue {}
</script>

<style lang="scss" scoped>
.ticker {
  height: 80px;
  width: 100%;
  color: #080;
  cursor: default;
  border-bottom-color: lightgrey;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

h1 {
  margin-bottom: 2px;
  font-size: 20pt;
}

h2 {
  margin-top: 4px;
  color: black;
}
</style>
