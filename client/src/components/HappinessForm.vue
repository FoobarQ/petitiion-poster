<template>
  <div class="happiness">
    <div class="title" @click="() => (hide = !hide)">
      <h1>
        Final Count:
        <span class="underline">{{
          $store.state.petition.signature_count
        }}</span>
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HappinessForm extends Vue {
  hide = false;
}
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}
.happiness {
  height: fit-content;
  width: 1400px;

  div {
    padding: 30px;
  }

  form {
    height: 200px;
  }
}
p {
  color: #080;
  padding: 1%;
  padding-top: 0%;
}

.underline {
  border-bottom-color: #080;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}
</style>
