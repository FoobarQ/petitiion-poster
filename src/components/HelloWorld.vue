<template>
  <div class="hello">
    <p>
      {{ $store.state.petition.background }}
      {{ $store.state.petition.additional_details }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
.hello {
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  border-radius: 25px;
  height: 100px;
  max-height: 200px;
  width: 2200px;
}
p {
  color: #080;
  padding: 5%;
  padding-top: 0%;
}
</style>
