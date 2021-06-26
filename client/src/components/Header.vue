<template>
  <div class="header">
    <div class="data">
      <h1>
        <a :href="link">{{ $store.state.petition.action }}</a>
        #<input
          :placeholder="$route.params.id"
          v-model="newId"
          v-on:keyup.enter="submit"
        />
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
export default class Header extends Vue {
  @Getter("link")
  link!: string;

  newId = "";

  submit(): void {
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

.header {
  position: fixed;
  height: 10%;
  width: 100%;
  z-index: 2;
  top: 0px;
  box-shadow: 0px 5px 3px 0px #ccc;
  min-height: 10%;
}

.header h1 {
  font-size: 2.5em;
  background: none;
}

.header h2 {
  cursor: default;
}

.data {
  position: absolute;
  bottom: 0px;
}
</style>
