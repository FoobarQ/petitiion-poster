<template>
  <VueSpeedometer></VueSpeedometer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import VueSpeedometer from "vue-speedometer";
// and use it in your component like

@Component({
  components: {
    VueSpeedometer,
  },
})
export default class Speedometer extends Vue {}
</script>
