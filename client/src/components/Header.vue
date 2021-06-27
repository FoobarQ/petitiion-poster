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
        <a class="button" :href="link">Go To Petition</a>
        <a class="button" href="/home">Find Other Petitions</a>
      </h1>
      <div class="bumper">
        <h2>by {{ $store.state.petition.creator_name || "Anonymous" }}</h2>
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
  min-height: fit-content;
  width: 100%;
  z-index: 2;
  top: 0px;
  box-shadow: 0px 5px 3px 0px #ccc;
  min-height: 10%;
}

.bumper {
  position: relative;
  background: #080;
  color: white;
  bottom: 0px;
  margin: 0;
}

.bumper h2 {
  margin: 0;
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

.button:before {
  content: "";
  height: 110%;
  width: 100%;
  display: block;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
}

.button {
  background-color: #080;
  position: relative;
  display: inline-block;
  padding: 0.3em 0.6em 0.2em 0.6em;
  border: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -webkit-box-shadow: 0 2px 0 #003c00;
  -moz-box-shadow: 0 2px 0 #003c00;
  box-shadow: 0 2px 0 #003c00;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 10px 5px 5px 0;
  padding: 0.1em;
  vertical-align: top;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  text-transform: none;
  text-align: center;
  width: 10%;
}

.button:hover {
  background: darkgreen;
}

.button:focus {
  background: #080;
}

.button + .button {
  background: grey;
}

.button + .button:hover {
  background: lightgrey;
}

.button + .button:focus {
  background: grey;
}

@media (max-width: 1900px) {
  .header h1 {
    font-size: 20pt;
  }

  .button {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
