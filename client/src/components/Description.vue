<template>
  <div class="description">
    <div class="title mobile" @click="() => (show = !show)">
      <h1>Description</h1>
    </div>
    <p v-if="show">
      {{ $store.state.petition.background }}
      {{ $store.state.petition.additional_details }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Description extends Vue {
  show = true;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
.description {
  height: fit-content;
  z-index: 3;
  width: 98%;
}
p {
  color: #080;
  padding: auto;
}

@media (max-width: 1080px) {
  p {
    padding: 4px;
  }
}

@media (max-width: 2520px) {
  .description {
    width: 97%;
  }
}
</style>
