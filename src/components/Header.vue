<template>
  <div class="header">
    <div class="data">
      <h1>
        <a :href="link">{{ $store.state.petition.action }}</a>
      </h1>
      <div>
        <h2>by {{ $store.state.petition.creator_name || "Unknown"}}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";
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
}
</script>

<style lang="scss">
.header {
  box-shadow: 0px 5px 3px 0px #ccc;
  position: fixed;
  height: 150px;
  width: 100%;
  top: 0px;
  z-index: 2;
}

a {
  text-decoration: none;
  color: #080;
}

h1 + div {
  position: relative;
  background: #080;
  color: white;
  bottom: 0px;
  margin: 0;

  h2 {
    margin: 0;
  }
}

.data {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>
