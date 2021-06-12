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
        <h2>by {{ $store.state.petition.creator_name || "Unknown" }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src
import LineChart from "../components/LineChart.vue";
import PieChart from "../components/PieChart.vue";
import { Getter } from "vuex-class";

@Component({
  components: {
    LineChart,
    HelloWorld,
    PieChart,
  },
})
export default class Header extends Vue {
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

<style lang="scss" scoped>
input {
  border-width: 0px;
  display: inline;
  padding: 0px;
  margin: 0px;
  max-width: 4em;
  font: inherit;
  font-size: 1em;
}
</style>
