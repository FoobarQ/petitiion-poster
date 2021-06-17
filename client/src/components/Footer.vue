<template>
  <div class="footer">
    <div class="data">
      <h1>
        <a>{{ $store.state.petition.action }}</a>
        #{{ $route.params.id }}
      </h1>
      <div>
        <h2 v-if="$store.state.petition.creator_name">
          by {{ $store.state.petition.creator_name }}
        </h2>
        <h2 v-else>.</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({})
export default class Footer extends Vue {
  @Getter("link")
  link!: string;
  newId = "";
  submit() {
    if (parseInt(this.newId)) {
      this.$router
        .push({ path: `/p/${this.newId}` })
        .catch((err) => console.log(err));
    }
  }
}
</script>

<style scoped>
input {
  border-width: 0px;
  display: inline;
  padding: 0px;
  margin: 0px;
  max-width: 4em;
  font: inherit;
  font-size: 1em;
}

input:focus {
  border-bottom-color: #080;
  border-bottom-width: 3px;
  border-bottom-style: groove;
  outline: none;
}

.footer {
  position: fixed;
  height: fit-content;
  min-height: 170px;
  background: white;
  width: 100%;
  z-index: 200;
  bottom: 0px;
  box-shadow: 0px -1px 3px 1px #ccc;
}

.footer h1 {
  font-size: 1.5em;
  background: none;
  padding: auto;
}

.data {
  position: absolute;
  bottom: 0px;
}
</style>
